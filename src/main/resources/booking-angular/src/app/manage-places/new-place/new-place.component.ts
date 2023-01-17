import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TypeOfPlace} from "../../models/type-of-place.model";
import {AmenitiesService} from "../../services/amenities.service";
import {Amenities} from "../../models/amenities-model";
import {TypeOfPlaceService} from "../../services/type-of-place.service";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent extends BaseComponent implements OnInit {

  currentPlace: number = 0;

  nameFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('');
  cityFormControl = new FormControl('');
  streetFormControl = new FormControl('');
  houseNrFormControl = new FormControl('');
  type = new FormControl<TypeOfPlace>({});

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // facilities = new FormControl<Amenities>({});

  facilities = this.formBuilder.group({
    grill: false,
    wifi: false,
    animal: false,
    view: false,
    parking: false,
    swimmingPool: false,
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  typesOfPlace: TypeOfPlace[] = [];
  facilitiesList: Amenities[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private amenitiesService: AmenitiesService,
              private typeOfPlaceService: TypeOfPlaceService) {
    super();
  }

  return = () => {
    this.sendMessage('Anulowano dodawanie obiektu', NotificationMessageType.INFO)
    this.router.navigateByUrl('places');
  };

  accept = () => {
    this.sendMessage('Poprawnie dodano nowy obiekt', NotificationMessageType.SUCCESS)
    this.router.navigateByUrl('places');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({numberOfPlaces}) => {
      this.currentPlace = numberOfPlaces.length + 1
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
}
