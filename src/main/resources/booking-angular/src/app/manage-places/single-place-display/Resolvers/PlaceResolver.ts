import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Place} from "../../../models/place.model";
import {PlaceService} from "../../../services/place.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PlaceResolver implements Resolve<Place> {
  constructor(private service: PlaceService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Place> | Promise<Place> | Place {
    return this.service.get(route.paramMap.get('id'))
  }

}
