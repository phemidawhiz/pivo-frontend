import React, {useState} from 'react';
import styles from './TruckDetail.scss';
import headerStyles from '../ProductsHeader/ProductsHeader.scss';
import {ILocation, ITruck} from "../../types/interfaces";
import {formatDateTime} from "../../lib/utils";
import Modal from "../Modal";
import modalStyles from "../Modal/Modal.scss";
import {createTruck, updateTruck} from "../../services/trucks";
import {AxiosResponse} from "axios";
import {createTruckLocation} from "../../services/locations";

interface IDetailsProp {
  truck: ITruck;
  locations: ILocation[];
}
const TruckDetails: React.SFC<IDetailsProp> = ({
  truck,
  locations
}) => {

  const [editTruckModal, setEditTruckModal] = useState<boolean>(false);
  const [createLocationModal, setCreateLocationModal] = useState<boolean>(false);

  const [truckId, setTruckId] = useState(null as unknown as number);

  const [responseMessage, setResponseMessage] = useState('');

  const closeEditTruckModal = () => setEditTruckModal(false);
  const closeCreateTLocationModal = () => setCreateLocationModal(false);

  const editTruck = async (event: any) => {
    event.preventDefault()
    updateTruck(truckId, {
      name: event.target.name.value,
      description: event.target.description.value,
      imageurl: event.target.imageurl.value
    }).then((response: AxiosResponse) => {

      if(response.status === 200) {
        closeEditTruckModal();
      } else {
        setResponseMessage(String(response));
      }

    })
  }

  const addTruckLocation = async (event: any) => {
    event.preventDefault()
    createTruckLocation( {
      truckId: truckId,
      longitude: event.target.longitude.value,
      latitude: event.target.latitude.value
    }).then((response: AxiosResponse) => {

      if(response.status === 200) {
        closeCreateTLocationModal();
      } else {
        setResponseMessage(String(response));
      }

    })
  }

  return (
    <>
      <section className={styles.categoriesAndPrices}>
        <h3>Details</h3>
        {
          (truck && truck.id)  ? (
            <>
              <div>
                <label>NAME: {truck && truck?.name}</label>
              </div>
              <div>
                <label>DESCRIPTION: {truck && truck?.description}</label>
              </div>
              <div>
                <label>DATE CREATED: {formatDateTime(truck && truck?.datetime)}</label>
              </div>

              <h4>
                <span
                  className={styles.truckLink}
                  onClick={ () => {
                    setEditTruckModal(true);
                    setTruckId(Number(truck && truck.id));
                  }}
                >Edit Truck</span> <br />
                <span
                  className={styles.truckLink}
                  onClick={ () => {
                    setCreateLocationModal(true);
                    setTruckId(Number(truck && truck.id));
                  }}
                >Add Location</span>
              </h4>

              <span className={modalStyles.responseMessage}>
                <small>
                  <b><i>click truck to see updates after editing of adding location</i></b>
                </small>
              </span><br />

              {/*Location modal*/}
              <Modal
                closeModal={closeCreateTLocationModal}
                title={`Add Location`}
                visible={createLocationModal}
              >
                <div>
                  <form onSubmit={addTruckLocation}>
                    <label htmlFor="longitude">Longitude</label>
                    <input id="longitude" name="longitude" type="text"  required  />

                    <label htmlFor="latitude">Latitude</label>
                    <input id="latitude" name="latitude" type="text" required />
                    <span className={modalStyles.responseMessage}>
                    <small>
                      <b><i>{responseMessage}</i></b>
                    </small>
                  </span><br />
                    <button type="submit">Create</button>
                  </form>
                </div>
              </Modal>

              {/*Truck modal*/}
              <Modal
                closeModal={closeEditTruckModal}
                title={`Edit Truck`}
                visible={editTruckModal}
              >
                <div>
                  <form onSubmit={editTruck}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text"  required defaultValue={truck?.name}  />

                    <label htmlFor="description">Description</label>
                    <input id="description" name="description" type="text" defaultValue={truck?.description} required />

                    <label htmlFor="imageurl">Image Link</label>
                    <input id="imageurl" name="imageurl" type="text" required defaultValue={truck?.imageurl} />
                    <span className={modalStyles.responseMessage}>
                      <small>
                        <b><i>{responseMessage}</i></b>
                      </small>
                    </span><br />
                    <button type="submit">Update</button>
                  </form>
                </div>
              </Modal>
            </>
          ) : (
            <small><i>No truck chosen yet. Please hover on truck image and click "view" to view its details</i></small>
          )
        }

        <hr className={styles.hr} />

        <h3>Locations</h3>
        {
          locations && locations.map( (item: ILocation, index) => (
            <div key={item.id}>
              <label> {index + 1}) {item && item?.latitude} / {item && item?.longitude}</label>
            </div>
          ))
        }
        {
          (locations.length === 0) ? (
            <small><i>No locations added for this truck</i></small>
          ) : ''
        }
      </section>


    </>
  )
};

export default TruckDetails;
