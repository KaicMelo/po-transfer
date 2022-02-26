import { HttpClient } from '@angular/common/http';
import { Items } from './../interfaces/items.interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const API = environment.API;

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Items[]>(API);
  }

  setItems(params: Items) {
    return this.http.post(API, params);
  }
}
