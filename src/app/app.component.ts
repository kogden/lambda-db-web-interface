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
  movies: Movie[];      // List of movie elements in db
  oneMovie: Movie;      // Select one movie from list
  baseUrl = 'https://vivycsg88i.execute-api.us-east-1.amazonaws.com/dev/notes';   // AWS url we call to hit lambda funcs
  samp = document.getElementsByTagName('samp');   // Grab samp element

  constructor(private movieService: AppService, private http: HttpClient) {}

  scrollSampUp(): void {    // Scrolls to top of samp element upon refresh
    this.samp[0].scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getAll(): void {          // GETs entire database, also used as refresh upon updates
    this.movieService.getAll().subscribe(data => {
      this.movies = data;
      console.log(data);
    });
    this.scrollSampUp();
  }

  getOne(id): void {        // GETs one entry with specific and highlights
    this.movieService.getAll().subscribe(data => {
      this.oneMovie = data.find(movie => movie._id === id);
    });
    this.scrollSampUp();
  }

  create(title, desc) {     // POST new element in database
    const toJson = {
      title: title,
      description: desc
    };

    const options = {       // POST request options
      host: this.baseUrl,
      port: '80',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.http.post(this.baseUrl, toJson, options).subscribe(      // POST, log outcome
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

  delete(id) {                        // DELETE req
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

  update(id, title, desc) {   // PUT req
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
