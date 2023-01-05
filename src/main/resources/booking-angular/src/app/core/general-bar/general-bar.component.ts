import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.scss']
})
export class GeneralBarComponent {

  constructor(private router: Router) {
  }

  btnClick = () => {
    this.router.navigateByUrl('');
  };

}
