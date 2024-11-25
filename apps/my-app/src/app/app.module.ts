import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AboutComponent } from './apps/my-app/src/app/components/about/about/about.component';
import { HeaderComponent } from './apps/my-app/src/app/components/ui/header/header/header.component';
import { FooterComponent } from './apps/my-app/src/app/components/ui/footer/footer/footer.component';
import { NavbarComponent } from './apps/my-app/src/app/components/ui/navbar/navbar.component';
import { RouterModule } from '@angular/router'; // Zorg ervoor dat dit is geïmporteerd
import { AppRoutingModule } from './app-routing.module'; // Zorg ervoor dat je AppRoutingModule importeert als je er een hebt
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
    ],
    imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
