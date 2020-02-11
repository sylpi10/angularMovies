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
      shown: true,
      img: "https://musicart.xboxlive.com/7/9a2a5100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
    },
    {
      title: "Avengers",
      year: 2012,
      code: 'US',
      country: 'United States',
      shown: true,
      img: "https://images-na.ssl-images-amazon.com/images/I/81%2BNup8-8NL._AC_SY445_.jpg"
    },
    {
      title: "Once upon a time in the west",
      year: 1972,
      code: 'IT',
      country: 'Italy',
      shown: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmMh6r4GDEGLIZQ80jQ3KIwMQNd9uFgjRGJq1Khovce7tzIdq"
    },
    {
      title: "rabbi jacob",
      year: 1969,
      code: 'FR',
      country: 'France',
      shown: false,
      img: "https://media3.woopic.com/api/v1/images/174%2Fcinemovies%2F4f5%2F5d1%2Ff88d5e28528c1c2c884ac91921%2Fles-aventures-de-rabbi-jacob%7Cmovies-36763-1.jpg?format=600x900&facedetect=1&quality=85"
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
