import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./apps/my-app/src/app/components/about/about/about.component";

const routes : Routes = [
    {path: "", redirectTo: "app-component", pathMatch: "full"},
    {path: "about", component: AboutComponent},
    {path: 'app-component', component: AppComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}