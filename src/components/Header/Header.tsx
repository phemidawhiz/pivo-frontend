import React from 'react';
import bejamasLogo from 'assets/images/bejamas.png';
import shoppingCart from 'assets/images/cart.png';
import styles from './Header.scss';
import Divider from 'components/Divider/Divider';
import Head from 'next/head';

const Header: React.SFC<{}> = ({

  }) => {

  return (
    <>
      <Head>
        <title> Pivo Coding Test | Trucks Management</title>
        <meta name="description" content="Truck management frontend." />
        <link rel="icon" href="../../favicon.ico" />
      </Head>

      <header className={styles.headerWrapper}>
        <div className={styles.logo}>
          <h3>Pivo</h3>
        </div>
        <div className={styles.truck}>
          <img src={shoppingCart}  />

        </div>
      </header>
      <Divider />
    </>
  );

}

export default Header;
