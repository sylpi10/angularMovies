import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'Amazing Movies';

  public defaultYear: string = 'all';

  public movies: Movie[] = [];
  public years: number[] = [];

  // public movies: any[] = [
  //   {
  //     title: 'Joker',
  //     year: 2019,
  //     code: 'US',
  //     country: 'United States',
  //     shown: true,
  //     img: "https://musicart.xboxlive.com/7/9a2a5100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
  //   },
  //   {
  //     title: "Avengers",
  //     year: 2012,
  //     code: 'US',
  //     country: 'United States',
  //     shown: true,
  //     img: "https://images-na.ssl-images-amazon.com/images/I/81%2BNup8-8NL._AC_SY445_.jpg"
  //   },
  //   {
  //     title: "Once upon a time in the west",
  //     year: 1972,
  //     code: 'IT',
  //     country: 'Italy',
  //     shown: false,
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmMh6r4GDEGLIZQ80jQ3KIwMQNd9uFgjRGJq1Khovce7tzIdq"
  //   },
  //   {
  //     title: "rabbi jacob",
  //     year: 1969,
  //     code: 'FR',
  //     country: 'France',
  //     shown: false,
  //     img: "https://media3.woopic.com/api/v1/images/174%2Fcinemovies%2F4f5%2F5d1%2Ff88d5e28528c1c2c884ac91921%2Fles-aventures-de-rabbi-jacob%7Cmovies-36763-1.jpg?format=600x900&facedetect=1&quality=85"
  //   }
  // ];

  public countries: string[] = [];


  constructor(private movieService: MovieService) {
    
   }

  ngOnInit() {

    const years: Set<number> = new Set<number>();
   
    this.movieService.all().pipe(take(1))

    .subscribe((response: any[])=> {
      this.movies = response.map((movie: Movie) => {
        years.add(movie.year);
        return new Movie().deserialize(movie)
      });
      this.years = Array.from(years).sort().reverse();
    });

  }

}
