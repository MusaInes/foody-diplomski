import { Component, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  @Input() userCalories: number = 0;
  public selectedItems: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  addItem(item: any) {
    console.log('parent', item);
    this.selectedItems = item
  }

  setTodayMeals() {
    console.log('kliknuto');
  }
}
