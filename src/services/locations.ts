import config from "config";
import axios, { AxiosResponse } from 'axios';
import {ILocation, ITruck} from "../types/interfaces";

export const fetchLocations = async (page: number | undefined, truckId: number | undefined) => {
  const trucks = await axios.get(`${config.api_domain}/locations/${truckId}/${page}`)
    .then((res: AxiosResponse) => {
        return res;
      },
      (error) => {
        return error
      }
    )
    .catch(err => ({
      error: err.response && err.response.errors,
    }));

  return trucks;
}

export const createTruckLocation = async (request: ILocation) => {
  const trucks = await axios.post(`${config.api_domain}/location/`, request)
    .then((res: AxiosResponse) => {
        return res;
      },
      (error) => {
        return error
      }
    )
    .catch(err => ({
      error: err.response && err.response.errors,
    }));

  return trucks;
}
