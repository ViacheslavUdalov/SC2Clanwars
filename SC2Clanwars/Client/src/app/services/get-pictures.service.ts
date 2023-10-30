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
    return this.http.get<IPortraits[]>('http://localhost:5034/assets/portraits.json');
  }
}
