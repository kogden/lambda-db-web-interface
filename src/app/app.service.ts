import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../assets/Movie';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'https://vivycsg88i.execute-api.us-east-1.amazonaws.com/Public/notes';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl);
  }



}
