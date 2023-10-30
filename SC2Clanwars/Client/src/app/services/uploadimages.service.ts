import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBanner, ITeamAvatar, ITournamentAvatar} from "../models/Pictires";

@Injectable({
  providedIn: 'root'
})
export class UploadimagesService {
private apiUrl = "http://localhost:5034/api/upload";
  private banner = "http://localhost:5034/StaticFiles";
  constructor(private http: HttpClient) { }
  uploadUserBannerFile(file: File): Observable<IBanner> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IBanner>(`${this.apiUrl}/userimages`, formData);
  }
  uploadTournamentFile(file: File): Observable<ITournamentAvatar> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ITournamentAvatar>(`${this.apiUrl}/tournaments`, formData);
  }
  uploadTeamFile(file: File): Observable<ITeamAvatar> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ITeamAvatar>(`${this.apiUrl}/teams`, formData);
  }
  getBannerImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.banner}/Images/${imageName}`, { responseType: 'blob' });
  }
  getTournamentAvatar(imageName: string): Observable<Blob> {
    return this.http.get(`${this.banner}/TournamentsAvatar/${imageName}`, { responseType: 'blob' });
  }
  getTeamAvatar(imageName: string): Observable<Blob> {
    return this.http.get(`${this.banner}/TeamsAvatar/${imageName}`, { responseType: 'blob' });
  }
}
