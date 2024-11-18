import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AboutComponent } from './apps/my-app/src/app/components/about/about/about.component';
import { HeaderComponent } from './apps/my-app/src/app/components/ui/header/header/header.component';
import { FooterComponent } from './apps/my-app/src/app/components/ui/footer/footer/footer.component';
import { AListComponent } from './apps/my-app/src/app/pages/component-a/a-list/a-list.component';
import { BListComponent } from './apps/my-app/src/app/pages/component-b/b-list/b-list.component';
import { NavbarComponent } from './apps/my-app/src/app/components/ui/navbar/navbar.component';
import { RouterModule } from '@angular/router'; // Zorg ervoor dat dit is geïmporteerd
import { AppRoutingModule } from './app-routing.module'; // Zorg ervoor dat je AppRoutingModule importeert als je er een hebt

@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        AListComponent,
        BListComponent,
        NavbarComponent
    ],
    imports: [BrowserModule, RouterModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
