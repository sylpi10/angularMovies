import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
  
})
export class MaterialModule { }
