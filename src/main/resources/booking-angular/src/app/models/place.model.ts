import {TypeOfPlace} from "./type-of-place.model";

export class Place {
  id?: any;
  name?: string;
  description?: string;
  city?: string;
  street?: string;
  house_nr?: string;
  user_id?: any;
  type_of_place?: TypeOfPlace;
}
