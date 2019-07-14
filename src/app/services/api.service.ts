import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {merge, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getITunesAlbum(query: string = ''): Observable<any> {
    return this.http.get(`${environment.iTunesApiUrl}?term=${query}&entity=album`);
    // return this.http.get(`/apiITunes?term=${query}&entity=album`);
  }

  getDeezerAlbum(query: string = ''): Observable<any> {
    // return this.http.get(`${environment.deezerApiUrl}?q=${query}&output=json`);
    return this.http.get(`http://localhost:4200/apiDeezer`, {responseType: 'text', headers});
  }

  getComplexAlbum(query: string = ''): Observable<any> {
    return merge(
      this.getITunesAlbum(query),
      this.getDeezerAlbum(query)
    );
    // return of('qq')
  }
}
