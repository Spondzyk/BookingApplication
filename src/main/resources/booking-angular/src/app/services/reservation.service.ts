import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from "./dto/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return  this.http.get<Reservation[]>(`/api/reservations`);
  }

  getReservation(id: number): Observable<Reservation>{
    return this.http.get<Reservation>(`$/api/reservations/${id}`)
  }

  cancelReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`$/api/reservations/${id}/cancel`, {})
  }

  updateReservation(data: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`$/api/reservations/${data.id}`, data)
  }
}
