import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;
  public movieForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  // get value from form
  public get synopsis(): AbstractControl {
    return this.movieForm.controls.synopsis;
  }


  ngOnInit(): void {
  
    this.movieForm = this.formBuilder.group({
      synopsis: [
        '',
        Validators.required
      ]
    });
    
    this.route.paramMap.subscribe((paramMap: any) => {  
      this.movieService.byId(paramMap.params.id).subscribe((movie: any) => {
        this.movie = movie;
         this.synopsis.setValue(this.movie.synopsis);
     })
    });

  }


  public doUpdate(): void{
   console.log("okkkkkkkkkkkkkkk update"); 
    this.movie.synopsis = this.synopsis.value; // value of movie becomes value written in form

    this.movieService.update(this.movie)
    .pipe(take(1)
    ).subscribe((response: HttpResponse<any>) => {
      console.log(`update done with : ${response.status}`);
     
    }); 
    this.snackBar.open( 'Movie Updated :-)',
    '',
    {
      duration: 2600,
    });
    
  }

    public doDelete(): void {
      this.movieService.delete(this.movie)
      .pipe(take(1))
      .subscribe((response =>{
        console.log("deleted");

      }));

      this.snackBar.open( 'Movie deleted :-)',
      '',
      {
        duration: 2600,
      });
    }
}
