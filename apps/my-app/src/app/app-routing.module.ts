import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./apps/my-app/src/app/components/about/about/about.component";
import { UserListComponent } from "@avans-nx-workshop/frontend/features/features";

const routes : Routes = [
    {path: "", redirectTo: "userlist", pathMatch: "full"},
    {path: "userlist", component: UserListComponent},
    {path: "about", component: AboutComponent},
    {path: 'app-component', component: AppComponent},
    // {path: 'component-a', component : AListComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}