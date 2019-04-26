import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Boat } from '../model/boat.model';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly endpoint = 'http://localhost:8080';
  private readonly endpoint1 =
    'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today&formatted=0';

  constructor(private readonly http: HttpClient) {}

  public getSunSet(): Observable<any> {
    return this.http.get<any>(this.endpoint1);
  }

  public getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.endpoint + '/get-reservation/' + id);
  }
  public addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(
      this.endpoint + '/add-reservation',
      reservation
    );
  }
  public editReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(
      this.endpoint + '/edit-reservation',
      reservation
    );
  }
  public getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.endpoint + '/get-allreservations');
  }
  public deleteReservation(reservation: Reservation): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/delete-reservation');
  }
  public getAvailable(
    localDateTime1: string,
    localDateTime2: string,
    number1: string
  ): Observable<Boat[]> {
    let params = new HttpParams()
      .set('localDateTime1', localDateTime1)
      .set('localDateTime2', localDateTime2)
      .set('numberofpersons1', number1);

    return this.http.get<Boat[]>(this.endpoint + '/get-availableboats', {
      params: params
    });
  }
}
