import { Injectable } from '@angular/core';
import { UserInterface } from './../models/user-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUser: UserInterface[];
  private _user: UserInterface = null;
  public userSubject$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user); 

  constructor() {
    this._registeredUser = new Array<any>();
    this._registeredUser.push(
      {
        login: 'John Doe',
        password: 'password',
        token: '1234',
        isAuthentificate: false
      }
    );
    
      const userAsString: string = localStorage.getItem('user');
      if (userAsString != null) {
        const userAsObject: any = JSON.parse(userAsString);
        this._user = this._registeredUser.find((obj: UserInterface)=> 
       obj.token == userAsObject.token);
        
        if (this._user !== undefined) {
            this._user.isAuthentificate = true;                          
            this.userSubject$.next(this._user);
        }else{
          this.userSubject$.next(null);
        }
      }
   }
public get user(): UserInterface {
  return this._user;
}

  public authentificate(user: UserInterface): boolean {
   this._user =  this._registeredUser.find(
     (obj: any)=> obj.login == user.login && obj.password == user.password);
        if (this._user !== undefined) {
          localStorage.setItem(
          'user',
          JSON.stringify({token: this._user.token})
    );
    this._user.isAuthentificate = true;
    this.userSubject$.next(this._user);
     return true;
    }
    this.userSubject$.next(null);
    return false;
  }

  /**
   * logout
  */
  public logout(): void {
    localStorage.removeItem('user'); 
    this._user = null;
    this.userSubject$.next(this._user);
  }
}
