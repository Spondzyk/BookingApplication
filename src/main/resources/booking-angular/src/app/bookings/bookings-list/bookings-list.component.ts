import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  options: Option[] = [
    {value: 'all', viewValue: 'ALL'},
    {value: 'current', viewValue: 'CURRENT'},
    {value: 'past', viewValue: 'PAST'},
    {value: 'canceled', viewValue: 'CANCELED'},
  ];
  optionControl: FormControl = new FormControl<Option>(this.options[0]);


  ngOnInit(): void {
    this.optionControl.setValue(this.options[0]);
  }


}
