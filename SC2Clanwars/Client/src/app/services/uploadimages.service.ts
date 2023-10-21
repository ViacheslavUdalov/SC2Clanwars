import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBanner} from "../models/Pictires";

@Injectable({
  providedIn: 'root'
})
export class UploadimagesService {
private apiUrl = "http://localhost:5034/api/upload";
  private banner = "http://localhost:5034/StaticFiles/Images";
  constructor(private http: HttpClient) { }
  uploadFile(file: File): Observable<IBanner> {
    const formData = new FormData();
    formData.append('file', file);
    // console.log('Отправка запроса на сервер:', `${this.apiUrl}`);
    return this.http.post<IBanner>(`${this.apiUrl}`, formData);
  }
  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.banner}/${imageName}`, { responseType: 'blob' });
  }
}
