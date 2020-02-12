import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // public movies: Movie[] = [];
  public search: string;

  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // this.byTitle();
  }

  public byTitle(): void{
    // const value: string = '';
    if (this.search.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.search.trim()).pipe(take(1))
  
      .subscribe((response: any[])=> {
        movies = response.map((movie: Movie) => {
          console.log(movie);
          return new Movie().deserialize(movie)
        });
        this.movies.emit(movies);
        
        console.log(`emit: ${JSON.stringify(movies)}`);
      });
    }
  }

}
