import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { take, tap, distinctUntilChanged, map } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() movies: EventEmitter<Observable<Movie[]>> = new EventEmitter<Observable<Movie[]>>();

  public searchForm: FormGroup;
  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
    ) { }

    public get searchTerm():AbstractControl {
      return this.searchForm.controls.searchTerm;
    }

    /**
     * reload method
     * show all movies when search bar is empty
     */
    public reload(): void{
      if (this.searchTerm.value.trim().length == 0) {
        
        this.movies.emit(
          this.movieService.all()
          
        );
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
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(350),
        // distinctUntilChanged(),
        map(()=>{
        this.byTitle();
      })
      ).subscribe();
  }


  /**
   * research method byTitle
   * return movies by partial title & ignore case (back-end)
   */
  public byTitle(): void{
    if (this.searchTerm.value.trim().length > 0) {
          this.movies.emit(
            this.movieService.byTitle(this.searchTerm.value.trim())
          )
    }
  }

}
