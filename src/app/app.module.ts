import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './global_comman/home/home.component';
import { HeaderComponent } from './global_comman/header/header.component';
import { SidenavComponent } from './global_comman/sidenav/sidenav.component';
import { FooterComponent } from './global_comman/footer/footer.component';
import { LoginComponent } from './global_comman/login/login.component';
import { TestComponent } from './global_comman/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
