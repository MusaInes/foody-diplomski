import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "./components/cards/cards.component";
import { LongCardComponent } from './components/long-card/long-card.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    CardsComponent,
    LongCardComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CardsComponent,
    LongCardComponent,
  ],
  providers: [
    {provide: AuthService},
    {provide: UserService}
  ]
})
export class SharedModule { }
