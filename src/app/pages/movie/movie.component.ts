import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

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
    private formBuilder: FormBuilder
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
   console.log("okkkkkkkkkkkkkkk"); 
    this.movie.synopsis = this.synopsis.value; // value of movie becomes value written in form

    this.movieService.update(this.movie)
    .pipe(take(1)
    ).subscribe((response: HttpResponse<any>) => {
      console.log(`update done with : ${response.status}`);
    }); 
  }

}
