import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user/user-edit.component';
import { ClubCreateComponent } from './club-creat/club-create.component'; 
import { ClubListComponent } from './club-list/club-list.component'; 
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchCreateComponent } from './match-create/match-create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { MatchEditComponent } from './match-edit/match-edit.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    ClubCreateComponent,
    ClubListComponent,   
    PlayerListComponent,
    PlayerCreateComponent,
    ClubDetailComponent,
    PlayerDetailComponent,
    MatchListComponent,
    MatchCreateComponent,
    LoginComponent,
    RegisterComponent,
    PlayerEditComponent,
    ClubEditComponent,
    MatchEditComponent,
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
    PlayerListComponent,
    PlayerCreateComponent,
    MatchListComponent,
    MatchCreateComponent,
    LoginComponent,
    RegisterComponent,
    PlayerEditComponent,
    ClubEditComponent,
    MatchEditComponent,
  ],
})
export class FeaturesModule {}