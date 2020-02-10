import { Component } from '@angular/core';

@Component({                                //
  selector: 'app-root',                     // decorateur
  templateUrl: './app.component.html',      //
  styleUrls: ['./app.component.scss']       // 
})
export class AppComponent {
  public title: string = 'Amazing Movies';

  public defaultCountry: string = 'US';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: this.defaultCountry,
      shown: true
    },
    {
      title: "Avengers",
      year: 2012,
      country: this.defaultCountry,
      shown: true
    },
    {
      title: "Once upon a time in the west",
      year: 1972,
      country: 'IT',
      shown: false
    }
  ];

  /**
   * toggleCountry
   */
  public toggleCountry(): void {
    (this.defaultCountry == 'US') ? this.defaultCountry = 'IT' : this.defaultCountry = 'US';

    this.movies.forEach((movie : any) => {
      movie.shown = movie.country == this.defaultCountry;
    });
  }

}
