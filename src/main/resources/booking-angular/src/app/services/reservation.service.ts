import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from "./dto/reservation";

const baseUrl = 'http://localhost:8080/api/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return  this.http.get<Reservation[]>(baseUrl);
  }

  getReservation(id: number): Observable<Reservation>{
    return this.http.get<Reservation>(`${baseUrl}/${id}`)
  }

  cancelReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${baseUrl}/${id}/cancel`, {})
  }

  updateReservation(data: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${baseUrl}/${data.id}`, data)
  }
}
