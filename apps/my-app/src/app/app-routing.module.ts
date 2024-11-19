import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AColumnsComponent } from "./apps/my-app/src/app/pages/component-a/a-columns.component";
import { AListComponent } from "./apps/my-app/src/app/pages/component-a/a-list/a-list.component";
import { BListComponent } from "./apps/my-app/src/app/pages/component-b/b-list/b-list.component";
import { ADetailsComponent } from "./apps/my-app/src/app/pages/component-a/a-details/a-details.component";

const routes : Routes = [
    {path: "", redirectTo: "component-a", pathMatch: "full"},
    {path: 'component-a', component : AListComponent},
    {path: 'component-b', component : BListComponent},
    {
        path: 'a-columns', 
        component : AColumnsComponent, 
        children : [{path: "a-details", component : ADetailsComponent}]
    },
    { path: 'details/:id', component: ADetailsComponent },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}