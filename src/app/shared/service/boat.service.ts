import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Boat } from '../model/boat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private readonly endpoint = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  // public getBoat(id: string): Observable<Boat> {
  //   let params = new HttpParams().set('id', id);
  //   return this.http.get<Boat>(this.endpoint + '/get-boat', {
  //     params: params
  //   });
  // }
  //  ${this.baseUrl}/todos/${id}`

  public getBoat(id: number): Observable<Boat> {
    return this.http.get<Boat>(this.endpoint + '/get-boat/' + id);
  }
  public addBoat(boat: Boat): Observable<void> {
    return this.http.post<void>(this.endpoint + '/add-boat', boat);
  }
  public editBoat(boat: Boat): Observable<void> {
    return this.http.post<void>(this.endpoint + '/edit-boat', boat);
  }
  public getAllBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.endpoint + '/get-allboats');
  }
  public deleteBoat(boat: Boat): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/delete-boat');
  }
}
