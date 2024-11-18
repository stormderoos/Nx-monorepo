import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AListComponent } from "./apps/my-app/src/app/pages/component-a/a-list/a-list.component";
import { BListComponent } from "./apps/my-app/src/app/pages/component-b/b-list/b-list.component";

const routes : Routes = [
    {path: "", redirectTo: "component-a", pathMatch: "full"},
    {path: 'component-a', component : AListComponent},
    {path: 'component-b', component : BListComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}