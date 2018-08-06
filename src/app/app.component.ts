import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Movie } from '../assets/Movie';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  movies: Movie[];
  baseUrl = 'https://vivycsg88i.execute-api.us-east-1.amazonaws.com/Public/notes';



  constructor(private movieService: AppService, private http: HttpClient) {}

  getAll(): void {
    this.movieService.getAll().subscribe(data => {
      this.movies = data;
      console.log(data);
    });
  }

  getOne(value): void {
    this.movieService.getAll().subscribe(data => {
      data.find(movie => movie._id === value);
    });
  }

  create() {
    const title = <HTMLInputElement>document.getElementById('titleEntry');
    const description = <HTMLInputElement>document.getElementById('descEntry');
    const options = {
      host: this.baseUrl,
      port: '80',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    const toJson = {
      'title': title.value,
      'description': description.value,
    };

    this.http.post(this.baseUrl, toJson, options);
    debugger;
  }
}
