import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent {

  constructor(private router: Router) {
  }

  return = () => {
    this.router.navigateByUrl('places');
  };
}
