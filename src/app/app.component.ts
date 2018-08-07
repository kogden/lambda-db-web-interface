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
  oneMovie: Movie;
  baseUrl = 'https://vivycsg88i.execute-api.us-east-1.amazonaws.com/dev/notes';

  constructor(private movieService: AppService, private http: HttpClient) {}

  getAll(): void {
    this.movieService.getAll().subscribe(data => {
      this.movies = data;
      console.log(data);
    });
  }

  getOne(value): void {
    this.movieService.getAll().subscribe(data => {
      this.oneMovie = data.find(movie => movie._id === value);
    });
  }

  create() {
    const title = <HTMLInputElement>document.getElementById('titleEntry');
    const description = <HTMLInputElement>document.getElementById('descEntry');

    const toJson = {
      'title': title.value,
      'description': description.value,
    };

    const options = {
      host: this.baseUrl,
      port: '80',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    this.http.post(this.baseUrl, toJson, options).subscribe(
      (val) => {
          console.log('POST call successful value returned in body',
                      val);
      },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
  }

  delete(value) {
    const deleteUrl = this.baseUrl + '/' + value;
    const options = {
      host: deleteUrl,
      port: '80',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    this.http.delete(deleteUrl, options).subscribe(
      (val) => {
          console.log('POST call successful value returned in body',
                      val);
      },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
  }
}
