import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { catchError, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
    public constructor(
        private movieService: MovieService,
        private router: Router 
        ){}
   
    public resolve(
       route: import("@angular/router").ActivatedRouteSnapshot, 
       state: import("@angular/router").RouterStateSnapshot
       ):Observable<any> {
           
        const id: number = parseInt(route.paramMap.get('id'));
        console.log(`hello resolver : ${id}`);
        
       return this.movieService.byId(id)
        .pipe(
            take(1),
            catchError((error: any, caught: any): Observable<any> =>{
                console.log(`Resolver failed with : ${JSON.stringify(error)}`);
                    return this._errorHandler(error);
                })
            );
            
    }

    private _errorHandler(error: number): Observable<any> {
        if (error === 404) {
            this.router.navigate(['home'])
        }
        return of(null);
    }
    
}
    
