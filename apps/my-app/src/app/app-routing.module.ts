import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./apps/my-app/src/app/components/about/about/about.component";
import { ClubCreateComponent, ClubDetailComponent, ClubListComponent, MatchListComponent, PlayerCreateComponent, PlayerDetailComponent, PlayerListComponent, UserEditComponent, UserListComponent } from "@avans-nx-workshop/frontend/features/features";
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
    { path: 'players/:id', component: PlayerDetailComponent }, // Nieuw: spelerdetails
    { path: 'clubs/:id', component: ClubDetailComponent }, // Detailpagina voor clubs
    { path: 'matches', component : MatchListComponent},
  ];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
  