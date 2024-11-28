import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./apps/my-app/src/app/components/about/about/about.component";
import { UserEditComponent, UserListComponent } from "@avans-nx-workshop/frontend/features/features";
import { HomeComponent } from "./apps/my-app/src/app/components/home/home.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'userlist', component: UserListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'useredit', component: UserEditComponent},
    { path: 'useredit/:id', component: UserEditComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}