import {Component} from '@angular/core';
import {BaseComponent} from "../core/abstract-base/base.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends BaseComponent{


  constructor() {
    super();
  }

}
