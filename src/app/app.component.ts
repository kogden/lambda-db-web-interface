import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Movie } from '../assets/Movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  movies: Movie[];


  constructor(private movieService: AppService) {}

  getAll(): void {
    this.movieService.getAll().subscribe(data => {
      this.movies = data;
      console.log(data);
    });
  }

  getOne(value): void {
  }
}
