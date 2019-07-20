import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, merge, Observable, of} from 'rxjs';
import {concatAll, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getITunesAlbum(query: string = ''): Observable<any> {
    return this.http.get<string>(`${environment.iTunesApiUrl}?term=${query}&limit=100&entity=album`);
  }

  getDeezerAlbum(query: string = ''): Observable<any> {
    return this.http.get(`/apiDeezer&q=artist:"${query}"&limit=100`);
  }

  getComplexAlbum(query: string = ''): Observable<any> {
    return forkJoin(
      this.getITunesAlbum(query),
      this.getDeezerAlbum(query)
    );
  }
}
