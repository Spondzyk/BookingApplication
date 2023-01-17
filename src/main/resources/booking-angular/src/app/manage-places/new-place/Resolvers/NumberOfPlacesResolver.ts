import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Place} from "../../../models/place.model";
import {PlaceService} from "../../../services/place.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class NumberOfPlacesResolver implements Resolve<Place[]> {
  constructor(private service: PlaceService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Place[]> | Promise<Place[]> | Place[] {
    return this.service.getAll()
  }

}
