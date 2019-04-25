import { Injectable } from '@angular/core';
import { Boat } from '../model/boat.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Trip } from '../model/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly endpoint = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  public getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.endpoint + '/get-trip/' + id);
  }
  public addTrip(trip: Trip): Observable<void> {
    return this.http.post<void>(this.endpoint + '/add-trip', trip);
  }
  public endTrip(trip: Trip): Observable<void> {
    return this.http.post<void>(this.endpoint + '/end-trip', trip);
  }
  public getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint + '/get-alltrips');
  }

  public getAvailableBoatsForTrip(
    localDateTime1: string,
    number1: string
  ): Observable<Map<number, string>> {
    let params = new HttpParams()
      .set('localDateTime1', localDateTime1)
      .set('numberofpersons1', number1);

    return this.http.get<Map<number, string>>(
      this.endpoint + '/get-availableboatsfortrip',
      {
        params: params
      }
    );
  }
}
