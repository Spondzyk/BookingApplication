import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Place} from "../../models/place.model";
import {PlaceService} from "../../services/place.service";

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  places?: Place[];

  constructor(private router: Router, private placeService: PlaceService) {
  }

  ngOnInit(): void {
    this.retrievePlaces();
  }

  retrievePlaces(): void {
    this.placeService.getAll()
      .subscribe({
        next: (data) => {
          this.places = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePlaces();
  }

  return = () => {
    this.router.navigateByUrl('');
  };

  newPlace = () => {
    this.router.navigateByUrl('places/add');
  };

  singlePlace = () => {
    this.router.navigateByUrl('places/:id');
  };
}
