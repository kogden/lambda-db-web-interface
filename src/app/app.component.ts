import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  baseUrl = 'https://vivycsg88i.execute-api.us-east-1.amazonaws.com/dev/notes/';

  constructor(private http: HttpClient) {}

  getOne(value: string) {

  }

  getAll() {
    return this.http.get(this.baseUrl);
  }
}
