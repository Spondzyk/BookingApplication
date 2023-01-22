import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AcceptanceDialogComponent} from "../../core/acceptance-dialog/acceptance-dialog.component";
import {Place} from "../../models/place.model";
import {PlaceService} from "../../services/place.service";
import {BaseComponent} from "../../core/abstract-base/base.component";
import {NotificationMessageType} from "../../models/notification-message";
import {AmenitiesService} from "../../services/amenities.service";
import {TypeOfPlaceService} from "../../services/type-of-place.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeOfPlace} from "../../models/type-of-place.model";
import {Amenities} from "../../models/amenities-model";

@Component({
  selector: 'app-single-place-display',
  templateUrl: './single-place-display.component.html',
  styleUrls: ['./single-place-display.component.scss']
})
export class SinglePlaceDisplayComponent extends BaseComponent implements OnInit {

  isEdit = false;

  currentPlace: Place = {type_of_place: {}, amenities: []};
  currentPlaceDirectory: string = ""
  currentPlaceImageFolderNumber: number = 0;
  placeAddress: string = "";

  nameFormControl: FormControl;
  countryFormControl: FormControl;
  cityFormControl: FormControl;
  streetFormControl: FormControl;
  houseNrFormControl: FormControl;
  type: FormControl;
  facilities: FormGroup;
  description: FormControl;

  typesOfPlace: TypeOfPlace[] = [];
  facilitiesList: Amenities[] = [];

  constructor(private placeService: PlaceService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private amenitiesService: AmenitiesService,
              private typeOfPlaceService: TypeOfPlaceService, private formBuilder: FormBuilder) {
    super();

    this.route.data.subscribe(({place}) => {
      console.log(place);
      this.currentPlace = place;
      if (this.currentPlace.image_folder_path) {
        this.currentPlaceDirectory = this.currentPlace.image_folder_path.substring(30);
        this.currentPlaceImageFolderNumber = Number(this.currentPlace.image_folder_path.substring(35));
      }
    });

    this.nameFormControl = new FormControl(this.currentPlace.name, [Validators.required]);
    this.countryFormControl = new FormControl(this.currentPlace.country);
    this.cityFormControl = new FormControl(this.currentPlace.city);
    this.streetFormControl = new FormControl(this.currentPlace.street);
    this.houseNrFormControl = new FormControl(this.currentPlace.house_nr);
    this.type = new FormControl(this.currentPlace.type_of_place)

    this.facilities = this.formBuilder.group({
      grill: false,
      wifi: false,
      animal: false,
      view: false,
      parking: false,
      swimmingPool: false,
    });
    this.changeCheckbox()
    this.description = new FormControl(this.currentPlace.description);
  }

  changeCheckbox(): void {
    for (let amenities of this.currentPlace.amenities) {
      switch (amenities.name) {
        case "Miejsce do grillowania":
          this.facilities.controls['grill'].setValue(true);
          break;
        case "Darmowe wifi":
          this.facilities.controls['wifi'].setValue(true);
          break;
        case "Przyjazne dla zwierząt":
          this.facilities.controls['animal'].setValue(true);
          break;
        case "Widok":
          this.facilities.controls['view'].setValue(true);
          break;
        case "Darmowy parking":
          this.facilities.controls['parking'].setValue(true);
          break;
        case "Basen":
          this.facilities.controls['swimmingPool'].setValue(true);
          break;
        default:
          break;
      }
    }
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

  ngOnInit(): void {

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

  return = () => {
    this.router.navigateByUrl('places');
  };

  deleteBtn() {
    const acceptanceDialog = this.dialog.open(AcceptanceDialogComponent);
    acceptanceDialog.afterClosed().subscribe((res) => {
      switch (res.event) {
        case "yes-option":
          this.placeService.delete(this.currentPlace.id)
            .subscribe(
              response => {
                console.log(response);
                this.router.navigate(['/places']);
                this.sendMessage('Usunięto obiekt', NotificationMessageType.SUCCESS)
              },
              error => {
                this.sendMessage(error, NotificationMessageType.ERROR)
              });
          break;
        case "no-option":
          this.sendMessage('Anulowano usunięcie obiektu', NotificationMessageType.INFO)
          break;
        default:
          break;
      }
    });
  };

  editBtn = () => {
    this.isEdit = true;
  };

  cancel = async () => {
    this.sendMessage('Anulowano edycję obiektu', NotificationMessageType.INFO);
    this.isEdit = false;
  }

  accept = async () => {
    this.sendMessage('Zapisano wyedytowany obiekt', NotificationMessageType.SUCCESS);
    this.isEdit = false;
  }

}
