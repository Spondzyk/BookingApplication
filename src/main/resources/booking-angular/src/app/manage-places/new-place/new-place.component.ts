import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent implements OnInit {

  currentPlace: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
