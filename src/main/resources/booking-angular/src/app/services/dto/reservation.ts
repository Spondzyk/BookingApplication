export interface Reservation {
  id: number;
  startDate: Date;
  endDate: Date;
  status: string;
  accomodationPlaceCity: string;
  accomodationPlaceStreet: string;
  accomodationPlaceHouse_nr: string;
  accomodationPlaceName: string;
}
