import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TypeOfPlace} from "../../models/type-of-place.model";
import {BaseComponent} from "../../core/abstract-base/base.component";

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

  typesOfPlace: TypeOfPlace[] = [
    {
      id: 1,
      name: 'hotel'
    },
    {
      id: 2,
      name: 'bungalow'
    },
    {
      id: 3,
      name: 'chatka puchatka'
    }
  ];

  facilities = this._formBuilder.group({
    telewzior: false,
    balkon: false,
    zimne_piwo: false,
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    super();
  }

  return = () => {
    this.router.navigateByUrl('places');
  };

  ngOnInit() {
    this.activatedRoute.data.subscribe(({numberOfPlaces}) => {
      this.currentPlace = numberOfPlaces.length + 1
    })
  }
}
