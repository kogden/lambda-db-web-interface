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

  getOne(id): void {
    this.movieService.getAll().subscribe(data => {
      this.oneMovie = data.find(movie => movie._id === id);
    });
  }

  create(title, desc) {
    const toJson = {
      title: title,
      description: desc
    };

    const options = {
      host: this.baseUrl,
      port: '80',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.http.post(this.baseUrl, toJson, options).subscribe(
      val => {
        console.log('POST call successful value returned in body', val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }

  delete(id) {
    const deleteUrl = this.baseUrl + '/' + id;
    const options = {
      host: deleteUrl,
      port: '80',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.http.delete(deleteUrl, options).subscribe(
      val => {
        console.log('DELETE call successful value returned in body', val);
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed.');
      }
    );
  }

  update(id, title, desc) {
    const updateUrl = this.baseUrl + '/' + id;
    const options = {
      host: updateUrl,
      port: '80',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const toJson = {
      title: title,
      description: desc
    };

    this.http.put(updateUrl, toJson, options).subscribe(
      val => {
        console.log('PUT call successful value returned in body', val);
      },
      response => {
        console.log('PUT call in error', response);
      },
      () => {
        console.log('The PUT observable is now completed.');
      }
    );
  }
}
