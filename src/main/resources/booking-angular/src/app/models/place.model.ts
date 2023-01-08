import {TypeOfPlace} from "./type-of-place.model";

export class Place {
  id?: any;
  name?: string;
  description?: string;
  city?: string;
  street?: string;
  house_nr?: string;
  image_folder_path?: string;
  user_id?: any;
  type_of_place?: TypeOfPlace;
  facilities?: string[];
  image_name_table?: string[];
}
