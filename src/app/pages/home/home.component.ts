import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'Amazing Movies';

  public defaultCountry: string = 'all';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      code: 'US',
      country: 'United States',
      shown: true
    },
    {
      title: "Avengers",
      year: 2012,
      code: 'US',
      country: 'United States',
      shown: true
    },
    {
      title: "Once upon a time in the west",
      year: 1972,
      code: 'IT',
      country: 'Italy',
      shown: false
    },
    {
      title: "rabbi jacob",
      year: 1969,
      code: 'FR',
      country: 'France',
      shown: false
    }
  ];

  public countries: string[] = [];

  // public constructor() {
  //  
  // }

  // public countries2: Set<string> = new Set();
  //   public constructor() {
  //     this.movies.forEach(movie =>{
  //       this.countries2.add(movie.code);
  //     })
  //   }

// public ngOnInit(): void {
//   this.movies.forEach((movie: any) =>{
//     this.toggleCountry.set(movie.country.code, movie.country)
//   })
// }


  constructor() { }

  ngOnInit(): void {
    this.movies.forEach(movie => {
          if (!this.countries.includes(movie.code)) {
            this.countries.push(movie.code);
          }
        });
  }

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
