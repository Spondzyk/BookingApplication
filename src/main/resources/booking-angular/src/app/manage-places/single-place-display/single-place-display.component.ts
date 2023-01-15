import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AcceptanceDialogComponent} from "../../core/acceptance-dialog/acceptance-dialog.component";
import {Place} from "../../models/place.model";
import {PlaceService} from "../../services/place.service";

@Component({
  selector: 'app-single-place-display',
  templateUrl: './single-place-display.component.html',
  styleUrls: ['./single-place-display.component.scss']
})
export class SinglePlaceDisplayComponent implements OnInit {

  currentPlace: Place = {};

  placeAddress: string = "";

  constructor(private placeService: PlaceService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({place}) => {
      this.currentPlace = place;
    });
  }

  return = () => {
    this.router.navigateByUrl('places');
  };

  deleteBtn() {
    const acceptanceDialog = this.dialog.open(AcceptanceDialogComponent);
    acceptanceDialog.afterClosed().subscribe((res) => {
      switch (res.event) {
        case "yes-option":
          this.placeService.delete(this.currentPlace.id)
            .subscribe(
              response => {
                console.log(response);
                this.router.navigate(['/places']);
              },
              error => {
                console.log(error);
              });
          break;
        case "no-option":
          break;
        default:
          break;
      }
    });
  };

  editBtn = () => {
    this.router.navigateByUrl('places');
  };

}
