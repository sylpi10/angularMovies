import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> = 
         new BehaviorSubject<number[]>(Array.from(this._years).sort());

  constructor(private httpClient: HttpClient) { }

  public get years(): Observable<Array<number>>{
    return of();
  }

  /***
   * get all movies
   */

  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
      ).pipe(take(1),
       map((response)=>{ 
        return response.map((item)=> {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
          return  new Movie().deserialize(item)
        }); 
      }));
  }

  /**
   * get movies by title 
   * @param search 
   */

  public byTitle(search: string): Observable<Movie[]>{
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie/byTitle?t=${search}`;
    console.log("byTitle clicked");
    return this.httpClient.get<Movie[]>(
      apiRoute
      ).pipe(take(1),
      map((response)=>{ 
        return response.map((item)=> {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item)
        }); 
      }));
  }


  public byId(id: number): Observable<any>{
    const apiRoute: string = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(
      apiRoute,
      {
        observe: 'response'
      }
    )
    .pipe(take(1),
      map((response) => {
        return response.body;
      }),
      catchError((error: any)=>{
        console.log(`smt went wrong (from movieService) : ${JSON.stringify(error)}`);
        return throwError(error.status)
      })
    );
  }

  public update(movie: any): Observable<HttpResponse<any>>{
    const apiRoot: string = `${environment.apiRoot}movie/modify`;
    return this.httpClient.put(
      apiRoot, 
      movie,
      {
        observe: 'response'
      }
    ).pipe(take(1),
      map((response: HttpResponse<any>) => {
      return response.body;
      }),
      catchError((error: any)=>{
        console.log(`smt went wrong : ${JSON.stringify(error)}`);
        return throwError(error.status)
      })
    );
  }

  public delete(movie: Movie): Observable<Movie>{
    const apiRoot: string = `${environment.apiRoot}movie/${movie.idMovie}`;
    return this.httpClient.delete<Movie>(apiRoot)
    .pipe(take(1),
      map((response => {
      return response;
      })
    ));
  }

  
}
