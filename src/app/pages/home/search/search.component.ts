import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  public searchForm: FormGroup;
  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
    ) { }

    public get searchTerm():AbstractControl {
      return this.searchForm.controls.searchTerm;
    }

    public reload(): void{
      if (this.searchTerm.value.trim().length == 0) {
        console.log("have to reload all movies");
       
        let movies: Movie[] = [];
        this.movieService.all().pipe(take(1))
    
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

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [
        '', // default value of control
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]
    });
  }

  public byTitle(): void{
    // const value: string = '';
    if (this.searchTerm.value.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.searchTerm.value.trim()).pipe(take(1))
  
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

  // public all(): void {
  //  
  // }
}
