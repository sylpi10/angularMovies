import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { 

  }

  public async allMovies(){
    const apiRoute: string = `${environment.apiRoot}movie`;
    let movies = null;
    try {
      movies = await fetch(apiRoute);
      console.log(`Movies : ${JSON.stringify(movies.body)}`);
    } catch (error) {
      // if smtg went wrong
      console.log("error !!!!" + error);
    }
  }

  public all(): Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
      ).pipe(take(1),
       map((response)=>{
        return response.map((item)=> new Movie().deserialize(item))
       }) 
      );
  }


  public byTitle(search: string): Observable<Movie[]>{
    const apiRoute: string = `${environment.apiRoot}movie/byTitle?t=${search}`;
    console.log("byTitle clicked");
    return this.httpClient.get<Movie[]>(
      apiRoute
      ).pipe(take(1),
       map((response)=>{
          return response.map((item)=> new Movie().deserialize(item))
        })
      );
  }
}
