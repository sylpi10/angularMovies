import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUser: any[];

  constructor() {
    this._registeredUser = new Array<any>();
    this._registeredUser.push(
      {
        login: '123456789',
        password: 'password'
      }
    );
   }

  public authenticate(user: any): boolean {
   const registeredUser: any =  this._registeredUser.find(
     (obj: any)=> obj.login == user.login && obj.password == user.password);
        if (registeredUser !== undefined) {
          localStorage.setItem(
          'user',
          JSON.stringify(user)
    );
     return true;
    }
  return false;
  }
}
