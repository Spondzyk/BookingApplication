import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../../models/place.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-place-card',
  templateUrl: './single-place-card.component.html',
  styleUrls: ['./single-place-card.component.scss']
})
export class SinglePlaceCardComponent implements OnInit {

  @Input() place!: Place;
  placeAddress: String = "";
  imagePath?: String;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.place.image_folder_path) {
      this.imagePath = this.place.image_folder_path + "/1.jpg"
    } else {
      this.imagePath = "../../../assets/images/obrazek.jpg";
    }
  }

  onClick(): void {
    let url: string = "places/" + String(this.place?.id)
    this.router.navigateByUrl(url);
  }

}
