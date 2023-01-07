import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'placeAddress'})
export class PlaceAddressPipe implements PipeTransform {

  transform(value: String, city: String | undefined, street: String | undefined, house_nr: String | undefined): String {
    if (city && street && house_nr) {
      return city + " - " + street + " " + house_nr;
    } else if (city && street) {
      return city + " - " + street
    } else if (city) {
      return city;
    } else {
      return "To miejsce nie ma określonego adresu"
    }
  }
}
