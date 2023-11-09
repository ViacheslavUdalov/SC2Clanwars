import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPortraits} from "../models/Pictires";

@Injectable({
  providedIn: 'root'
})
export class GetPicturesService {
  constructor(private http: HttpClient) { }
  GetPortraitsJson(): Observable<IPortraits[]> {
    return this.http.get<IPortraits[]>('https://localhost:7034/assets/portraits.json');
  }
}
