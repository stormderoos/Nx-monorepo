import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './libs/frontend/features/features/src/lib/users/user-details/user-details/user-details.component';
import { UserListComponent } from './libs/frontend/features/features/src/lib/users/user-list/user-list/user-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UserDetailsComponent, UserListComponent]
})
export class FrontendFeaturesFeaturesModule {}
