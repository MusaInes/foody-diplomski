import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './pages/shared/services/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './pages/shared/services/auth.interceptor';
import { AuthService } from './pages/shared/services/auth.service';
import { Profile, User } from './pages/shared/models/foody.model';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AuthGuardService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }, User, Profile],
  bootstrap: [AppComponent]
})
export class AppModule { }
