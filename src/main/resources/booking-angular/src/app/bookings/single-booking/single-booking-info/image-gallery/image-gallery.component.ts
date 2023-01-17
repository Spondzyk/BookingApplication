import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../../../models/place.model";

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  constructor() {
  }

  @Input() path_image?: string[];
  photos: string[] = [];

  public width = '550px';
  public height = '400px';

  ngOnInit(): void {
    let imageCont = document.getElementById('image-single-booking');
    if(imageCont) {
      this.width = `${imageCont.offsetWidth}px`;
    }
    if(this.path_image) {
      for (let photoUrl of this.path_image) {
        this.photos.push(photoUrl);
      }
    }
  }
}
