import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user/user-edit.component';
import { ClubCreateComponent } from './club-creat/club-create.component'; 
import { ClubListComponent } from './club-list/club-list.component'; 

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    ClubCreateComponent,
    ClubListComponent,   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    UserListComponent,
    UserEditComponent,
    ClubCreateComponent, 
    ClubListComponent, 
  ],
})
export class FeaturesModule {}