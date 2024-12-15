import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./apps/my-app/src/app/components/about/about/about.component";
import { ClubCreateComponent, ClubDetailComponent, ClubEditComponent, ClubListComponent, LoginComponent, MatchCreateComponent, MatchEditComponent, MatchListComponent, PlayerCreateComponent, PlayerDetailComponent, PlayerEditComponent, PlayerListComponent, RegisterComponent, UserEditComponent, UserListComponent } from "@avans-nx-workshop/frontend/features/features";
import { HomeComponent } from "./apps/my-app/src/app/components/home/home.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'userlist', component: UserListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'useredit/:_id', component: UserEditComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'clublist', component: ClubListComponent},
    { path: 'clubs', component: ClubListComponent },
    { path: 'clubcreate', component: ClubCreateComponent },
    { path: 'players', component: PlayerListComponent},
    { path: 'playercreate', component: PlayerCreateComponent},
    { path: 'players/:_id', component: PlayerDetailComponent }, 
    { path: 'clubs/:id', component: ClubDetailComponent }, 
    { path: 'matches', component : MatchListComponent},
    { path: 'matchcreate', component: MatchCreateComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'playeredit/:_id', component: PlayerEditComponent },
    { path: 'clubedit/:_id', component: ClubEditComponent },  
    { path: 'matchedit/:_id', component: MatchEditComponent },

  ];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
  