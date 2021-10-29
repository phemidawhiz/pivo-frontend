import React, {useState} from 'react';
import styles from './ProductsHeader.scss'
import modalStyles from '../Modal/Modal.scss'
import Modal from "../Modal";
import {createTruck} from "../../services/trucks";
import {AxiosResponse} from "axios";
import Router from "next/router";

const ProductsHeader: React.SFC<{}> = () => {
  // create truck modal
  const [createTruckModal, setCreateTruckModal] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState('');
  const closeCreateTruckModal = () => setCreateTruckModal(false);

  const addTruck = async (event: any) => {
    event.preventDefault()
    createTruck({
      name: event.target.name.value,
      description: event.target.description.value,
      imageurl: event.target.imageurl.value
    }).then((response: AxiosResponse) => {
      if(response.status === 200) {
        setResponseMessage('');
        Router.reload();
        closeCreateTruckModal();
      } else {
        setResponseMessage(String(response));
      }

    })
  }

  return (
    <>
      {/* Truck header */}
      <section className={styles.productsHeader}>
        <div>
          <h2> Pivo Trucks / <span>Truck List</span></h2>
        </div>
        <div>
          <h4>
            <span
              className={styles.truckLink}
              onClick={ () => setCreateTruckModal(true)}
            >Create Truck</span>
          </h4>
        </div>
      </section>

      {/*Truck modal*/}
      <Modal
        closeModal={closeCreateTruckModal}
        title={`Add New Truck`}
        visible={createTruckModal}
      >
        <div>
          <form onSubmit={addTruck}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text"  required />

            <label htmlFor="name">Description</label>
            <input id="description" name="description" type="text"  required />

            <label htmlFor="name">Image Link</label>
            <input id="imageurl" name="imageurl" type="text" required />
            <span className={modalStyles.responseMessage}>
              <small>
                <b><i>{responseMessage}</i></b>
              </small>
            </span><br />
            <button type="submit">Create</button>
          </form>
        </div>
      </Modal>
    </>
  )

};

export default ProductsHeader;
