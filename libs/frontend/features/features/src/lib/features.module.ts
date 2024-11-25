import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    declarations: [UserListComponent],
    imports: [
      CommonModule,
      HttpClientModule, // Voor HTTP-aanroepen
    ],
    exports: [UserListComponent], // Exporteer component zodat het elders bruikbaar is
  })
export class FrontendFeaturesFeaturesModule {}
