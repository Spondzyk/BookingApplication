import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Place} from "../../models/place.model";
import {PlaceService} from "../../services/place.service";
import {BaseComponent} from "../../core/abstract-base/base.component";

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent extends BaseComponent implements OnInit {

  places: Place[] = [];

  constructor(private router: Router, private placeService: PlaceService) {
    super();
    this.placeService.getAllUserPlaces()
      .subscribe({
        next: (data) => {
          this.places = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
  }

  return = () => {
    this.router.navigateByUrl('');
  };

  newPlace = () => {
    this.router.navigateByUrl('places/add');
  };

  singlePlace() {
    this.router.navigateByUrl('places/7');
  }
}
