import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUser: any[];
  public isAuthentificate: boolean = false;

  constructor() {
    this._registeredUser = new Array<any>();
    this._registeredUser.push(
      {
        login: '123456789',
        password: 'password'
      }
    );
      const userAsString: string = localStorage.getItem('user');
      if (userAsString != null) {
        this.isAuthentificate = true;
      }
   }

  public authenticate(user: any): boolean {
   const registeredUser: any =  this._registeredUser.find(
     (obj: any)=> obj.login == user.login && obj.password == user.password);
        if (registeredUser !== undefined) {
          localStorage.setItem(
          'user',
          JSON.stringify(user)
    );
    this.isAuthentificate = true;
     return true;
    }
  return false;
  }

  /**
   * logout
  */
  public logout(): void {
    localStorage.removeItem('user'); 
    this.isAuthentificate = false;
  }
}
