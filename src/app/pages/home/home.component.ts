import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'Amazing Movies';

  public defaultYear: string = 'all';

  public movies: Observable<Movie[]>;
  public years: number[] = [];


  public countries: string[] = [];
  public search: string;

  constructor(private movieService: MovieService) {
   }

  ngOnInit() {
    this.movies = this.movieService.all();
  }

/**
 * receiveMovies
$ */
  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`received movies : ${JSON.stringify(this.movies)}`);
  }

}
