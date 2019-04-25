import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Price } from '../model/price.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private readonly endpoint = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  public addPrice(price: Price): Observable<void> {
    return this.http.post<void>(this.endpoint + '/add-price', price);
  }
  public editPrice(boat: Price): Observable<void> {
    return this.http.post<void>(this.endpoint + '/edit-price', boat);
  }
  public getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.endpoint + '/get-allprices');
  }
}
