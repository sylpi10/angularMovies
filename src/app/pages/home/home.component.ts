import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'Amazing Movies';

  public defaultYear: number = 0;
  public years: number[] = [];
  private yearSubscription: Subscription;

  public movies: Observable<Movie[]>;


  public countries: string[] = [];
  public search: string;

  constructor(
    private movieService: MovieService,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.movies = this.movieService.all();

    this.yearSubscription = this.movieService.years$.subscribe((_years) =>{
      this.years = _years;
    });
  }

/**
 * receiveMovies
$ */
  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`received movies : ${JSON.stringify(this.movies)}`);
  }

  /**
   * see movie detail or got to login page
   * @param idMovie 
   */
  public mustBeLogin(idMovie: number): void{
    
      if (this.userService.user) {
        this.router.navigate(['../','movie', idMovie])
      }else{
        this.snackBar.open( 'You must be logged in',
        '',
        {
          duration: 2600,
          verticalPosition: 'top'
        });
        setTimeout(()=>{
          this.router.navigate(['../','login'], {
            state: [idMovie]
          });
      }, 1600);
    
      }
    }

 

}
