/* eslint-disable @typescript-eslint/no-var-requires,no-console */
require('dotenv').config();

const express = require('express');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');
const compression = require('compression');
const UglifyJS = require('uglify-js');
const expectCt = require('expect-ct');

const isDev = process.env.NODE_ENV !== 'production';
const devBuildMode = isDev;

console.log('************************************');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log('************************************');

const port = parseInt(process.env.APP_PORT, 10) || 80;
const app = next({ dev: devBuildMode });

const handler = app.getRequestHandler(app);

const validUrl = (req, res, nxt) => {
    if (!req.query.url) {
        nxt(new Error('No url specified'));
    } else if (typeof req.query.url !== 'string' || parse(req.query.url).host === null) {
        nxt(new Error(`Invalid url specified: ${req.query.url}`));
    } else {
        nxt();
    }
};

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(expectCt({
            enforce: true,
            maxAge: 31536000
        }));
        server.disable('x-powered-by');
        server.set('trust proxy', 'loopback');
        server.use(compression());

        server.use((req, res, nxt) => {
            //TODO Remove this block once we start using heml chart in production
            if (req.path === '/health-status') {
                return res.send('Health status OK');
            }

            if (req.path === '/health') {
                return res.send('Health status OK');
            }

            return nxt();
        });

        server.all('*', (req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            // handle GET request to /service-worker.js
            if (pathname === '/service-worker.js') {
                // Ensure this matches the distDir value in next.config.js
                const distDir = '.next';

                const filePath = join(__dirname, distDir, pathname);

                app.serveStatic(req, res, filePath);
            } else if (pathname === '/v1/inline.js') {
              const host = req.get('host');
              const filePath = join(__dirname, 'external-scripts/v1/inline.js');
              const content = fs.readFileSync(filePath, 'utf8');
              const protocol = (process.env.KUBERNETES_SERVICE_HOST) ? 'https' : 'http';
              const result = content.replace('"use strict";', '')
                .replace(/\\n/g, '')
                .replace(/\s\s+/g, '')
                .replace('Object.defineProperty(exports, "__esModule", { value: true });', '')
                .replace(/http\:\/\/localhost\//g, `${protocol}://${host}/`);

              res.setHeader('content-type', 'application/javascript');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(UglifyJS.minify(result).code)

            } else if (pathname === '/v2/inline.js') {
                const host = req.get('host');
                const filePath = join(__dirname, 'external-scripts/v2/inline.js');
                const content = fs.readFileSync(filePath, 'utf8');
                const protocol = (process.env.KUBERNETES_SERVICE_HOST) ? 'https' : 'http';
                const result = content.replace('"use strict";', '').replace(/\\n/g, '').replace(/\s\s+/g, '')
                  .replace('Object.defineProperty(exports, "__esModule", { value: true });', '')
                  .replace(/http\:\/\/localhost\//g, `${protocol}://${host}/`);

                res.setHeader('content-type', 'application/javascript');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(UglifyJS.minify(result).code);
            } else {
                handler(req, res, parsedUrl);
            }
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
