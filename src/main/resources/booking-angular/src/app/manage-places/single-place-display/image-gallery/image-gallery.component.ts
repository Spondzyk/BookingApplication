import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../../models/place.model";


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  constructor() {
  }

  @Input() place!: Place;
  photos: string[] = [];

  public width = '550px';
  public height = '400px';

  ngOnInit(): void {
    if (this.place.image_name_table !== undefined) {
      for (let photoUrl of this.place.image_name_table.reverse()) {
        let path = this.place.image_folder_path + "/" + photoUrl;
        this.photos.push(path);
      }
    }
  }

}
