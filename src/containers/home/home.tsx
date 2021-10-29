import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { fetchTrucks } from 'services/trucks';
import Header from 'components/Header/Header';
import {ILocation, IPaginationType, ITruck} from 'types/interfaces';
import styles from './Home.scss';
import ProductsHeader from 'components/ProductsHeader/ProductsHeader';
import AddLocation from 'components/AddLocation/AddLocation';
import 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import {AxiosResponse} from "axios";
import {formatDateTime} from "../../lib/utils";
import TruckDetails from "components/TruckDetail/TruckDetail";
import {fetchLocations} from "../../services/locations";
import Pagination from "../../components/Pagination/Pagination";

const Home: NextPage<{}> = () => {

  const [trucksArray, setTrucksArray] = useState([] as Array<ITruck>);
  const [pageNumber, setPageNumber] = useState(1 as unknown as number | undefined);
  const [currentTruck, setCurrentTruck] = useState({} as ITruck);
  const [currentLocations, setCurrentLocations] = useState([] as ILocation[]);
  const [pages, setPages] = useState([] as Array<number>)
  const [displayLocationButtonIndex, setDisplayLocationButtonIndex] = useState(null as unknown as number);
  const [paginationInfo, setPaginationInfo] = useState({} as IPaginationType);

  const navigate = (page: number | undefined = 1) => {
    fetchTrucks(page).then((response: AxiosResponse) => {
      if(response.status === 200) {
        const trucksData = response && response.data && response.data.data;
        setTrucksArray(trucksData.trucks);
        setPaginationInfo(trucksData.pagination);
        setPages([1, 2, 3]);
        setPageNumber(page);
      }
    })
  }

  const getTruckLocations = (truckId: number | undefined) => {
    fetchLocations(1, truckId).then((response: AxiosResponse) => {
      if(response.status === 200) {
        const locationsData = response && response.data && response.data.data;
        setCurrentLocations(locationsData);
      }
    })
  }

  useEffect(() => {
    navigate(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <Header />

      <ProductsHeader navigate={navigate} />

      {/* Truck list and details */}
      <section className={styles.trucks}>

        {/** Truck list */}
        <div>
          {
            trucksArray && trucksArray?.map( (item: ITruck, index) => (
              <div className={styles.artwork} key={index} onMouseEnter={ () => setDisplayLocationButtonIndex(index)} >
                <img
                  onClick={ () => {
                    setCurrentTruck(item);
                    getTruckLocations(item.id);
                  }}
                  className="lazyload lazy"
                  data-sizes="auto"
                  src={`${item && item.imageurl}`} alt={item && item.name} />
                {
                  (displayLocationButtonIndex === index) ? (
                    <span onClick={ () => {
                      setCurrentTruck(item);
                      getTruckLocations(item.id);
                    }}><AddLocation listCart={true} /></span>
                  ) : (
                    ''
                  )
                }
                <p>Created {formatDateTime(item && item?.datetime)}</p>
                <h4>{item && item?.name}</h4>
                
              </div>

            ))
          }
        </div>

        {/** Chosen truck details */}
        <div>
          <TruckDetails locations={currentLocations} truck={currentTruck} />
        </div>
      </section>

      <Pagination trucks={trucksArray} page={Number(pageNumber)} paginationInfo={paginationInfo} navigate={navigate} />
    </>
  );
};

export default Home;
