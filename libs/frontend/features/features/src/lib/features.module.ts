import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [UserListComponent, UserEditComponent],
    imports: [
      CommonModule,
      HttpClientModule, // Voor HTTP-aanroepen
      ReactiveFormsModule,
      FormsModule,
      RouterModule
    ],
    exports: [UserListComponent, UserEditComponent], 
  })
export class FeaturesModule {}
