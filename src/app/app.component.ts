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
      country: this.defaultCountry
    },
    {
      title: "Avengers",
      year: 2012,
      country: this.defaultCountry
    },
    {
      title: "Once upon a time in the weeeest",
      year: 1972,
      country: 'IT'
    }
  ];

  /**
   * toggleCountry
   */
  public toggleCountry(): void {
    // this.defaultCountry = 'US' ? 'IT' : 'US';

    if (this.defaultCountry == 'US') {
      this.defaultCountry = 'IT';
    } else {
      this.defaultCountry = 'US'
    }
  }

}
