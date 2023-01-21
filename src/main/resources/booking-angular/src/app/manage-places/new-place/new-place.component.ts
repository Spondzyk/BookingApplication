import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TypeOfPlace} from "../../models/type-of-place.model";
import {AmenitiesService} from "../../services/amenities.service";
import {Amenities} from "../../models/amenities-model";
import {TypeOfPlaceService} from "../../services/type-of-place.service";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";
import {PlaceService} from "../../services/place.service";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent extends BaseComponent implements OnInit {

  newPlaceIndex: number = 0;

  nameFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  streetFormControl = new FormControl('', [Validators.required]);
  houseNrFormControl = new FormControl('', [Validators.required]);
  type = new FormControl<TypeOfPlace>({}, [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  facilities = this.formBuilder.group({
    grill: false,
    wifi: false,
    animal: false,
    view: false,
    parking: false,
    swimmingPool: false,
  });

  typesOfPlace: TypeOfPlace[] = [];
  facilitiesList: Amenities[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private amenitiesService: AmenitiesService,
              private typeOfPlaceService: TypeOfPlaceService, private placeService: PlaceService) {
    super();
  }

  return = () => {
    this.sendMessage('Anulowano dodawanie obiektu', NotificationMessageType.INFO)
    this.router.navigateByUrl('places');
  };

  accept = () => {
    this.savePlace();
    this.router.navigateByUrl('places');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({numberOfPlaces}) => {
      this.newPlaceIndex = numberOfPlaces[numberOfPlaces.length - 1].id + 1;
    })

    this.amenitiesService.getAll().subscribe({
      next: (data) => {
        this.facilitiesList = data;
        console.log(data);
      }
    });

    this.typeOfPlaceService.getAll().subscribe({
      next: (data) => {
        this.typesOfPlace = data;
        console.log(data);
      }
    })
  }

  returnCheckboxValue(): Amenities[] {
    let result: Amenities[] = [];

    if (this.facilities.controls['grill'].value === true) {
      result.push({id: 1, name: "Miejsce do grillowania"})
    } else if (this.facilities.controls['wifi'].value === true) {
      result.push({id: 2, name: "Darmowe wifi"})
    } else if (this.facilities.controls['animal'].value === true) {
      result.push({id: 3, name: "Przyjazne dla zwierząt"})
    } else if (this.facilities.controls['view'].value === true) {
      result.push({id: 4, name: "Widok"})
    } else if (this.facilities.controls['parking'].value === true) {
      result.push({id: 5, name: "Darmowy parking"})
    } else if (this.facilities.controls['swimmingPool'].value === true) {
      result.push({id: 6, name: "Basen"})
    }

    return result
  }

  savePlace() {
    const data = {
      user: {id: 1},
      name: this.nameFormControl.value!,
      description: this.descriptionFormControl.value!,
      city: this.cityFormControl.value!,
      street: this.streetFormControl.value!,
      house_nr: this.houseNrFormControl.value!,
      country: this.countryFormControl.value!,
      type_of_place: this.type.value!,
      amenities: this.returnCheckboxValue()
    }

    console.log(data)

    this.placeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.sendMessage("Dodano nowy obiekt", NotificationMessageType.SUCCESS)
        },
        error: (e) => {
          console.error(e)
          this.sendMessage("Błąd podczas dodawania obiektów", NotificationMessageType.ERROR)
        }
      });
  }
}
