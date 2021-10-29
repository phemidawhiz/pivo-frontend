export interface IRecords {
  total: number,
  limit: number
}

export interface IPaginationType {
  page?: number;
  totalPages?: number;
  nextPageUrl?: string;
  previousPageUrl?: string | null;
}

export interface IRecommendation {
  src: string;
  alt: string;
}

export interface IDimmentions {
  width: number;
  height: number;
}

export interface ITruck {
  name: string;
  id?: number;
  imageurl: string;
  description: string;
  datetime?: string;
}

export interface ILocation {
  id?: number;
  truckId: number;
  latitude: string;
  longitude: string;
  datetime?: string | Date;
}

export interface ILocationResponse {
  locations: ILocation[];
  pagination?: IPaginationType;
}

export interface ITruckResponse {
  trucks: ITruck[];
  pagination?: IPaginationType;
}
export interface IPage {
  page: number;
  url: number;
}
