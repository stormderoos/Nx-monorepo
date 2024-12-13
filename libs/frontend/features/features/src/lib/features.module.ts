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
  ],
})
export class FeaturesModule {}