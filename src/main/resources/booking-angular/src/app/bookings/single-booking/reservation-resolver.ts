import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Reservation} from "../../services/dto/reservation";
import {ReservationService} from "../../services/reservation.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ReservationResolver implements Resolve<Reservation> {
  constructor(private service: ReservationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reservation> {
    // @ts-ignore
    let id:number = +route.paramMap.get('id')
    return this.service.getReservation(id)
  }

}
