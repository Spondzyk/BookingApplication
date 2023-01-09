export interface Reservation {
  id: number;
  startDate: Date;
  endDate: Date;
  status: string;
  accomodationPlaceCity: string;
  accomodationPlaceStreet: string;
  accomodationPlaceHouse_nr: string;
  accomodationPlaceName: string;
  price?: number;
  accomodationPrice?: number;
  paymentStatus?: string;
  people_nr?: number;
  accomodationName?: string;
  accomodationDescription?: string;
  accomodationPlaceDescription?: string;
  accomodationPlaceUserName?: string;
}
