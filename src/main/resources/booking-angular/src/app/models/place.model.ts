import {TypeOfPlace} from "./type-of-place.model";
import {Amenities} from "./amenities-model";

export class Place {
  id?: any;
  name?: string;
  description?: string;
  city?: string;
  street?: string;
  house_nr?: string;
  country?: string;
  image_folder_path?: string;
  user_id?: any;
  type_of_place!: TypeOfPlace;
  amenities!: Amenities[];
  image_name_table?: string[];
}
