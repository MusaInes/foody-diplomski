import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { SuggestionComponent } from './main/suggestion/suggestion.component';
import { SuggestionItemComponent } from './main/suggestion/suggestion-item/suggestion-item.component';
import { ChartComponent } from './main/chart/chart.component';

@NgModule({
  declarations: [
    MainComponent,
    SuggestionComponent,
    SuggestionItemComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MainComponent },
      { path: 'home', component: MainComponent }
    ])
  ],
  exports: [
    SuggestionComponent
  ]
})
export class DashboardModule { }
