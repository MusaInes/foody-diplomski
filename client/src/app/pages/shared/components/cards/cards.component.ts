import { Component, Input, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() models: any[] = [];
  filmIcon = faFilm;

  constructor() { }

  ngOnInit(): void {
  }

}
