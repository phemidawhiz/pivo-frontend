import config from "config";
import axios, { AxiosResponse } from 'axios';
import {ITruck} from "../types/interfaces";

export const fetchTrucks = async (page: number | undefined) => {
  const trucks = await axios.get(`${config.api_domain}/trucks/${page}`)
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

export const createTruck = async (request: ITruck) => {
  const trucks = await axios.post(`${config.api_domain}/truck/`, request)
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

export const updateTruck = async (truckId: number, request: ITruck) => {
  const trucks = await axios.put(`${config.api_domain}/truck/${truckId}`, request)
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

export const findTruck = async (truckId: number) => {
  const trucks = await axios.get(`${config.api_domain}/truck/${truckId}`)
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
