import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const baseUrl = 'api/amenities';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

}
