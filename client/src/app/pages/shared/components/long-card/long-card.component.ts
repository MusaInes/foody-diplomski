import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodayMealsService } from '../../services/today-meals.service';

@Component({
  selector: 'app-long-card',
  templateUrl: './long-card.component.html',
  styleUrls: ['./long-card.component.scss']
})
export class LongCardComponent implements OnInit {
  @Input() model: any = {};

  constructor(private http: HttpClient, private mealsService: TodayMealsService, private router: Router) { }

  ngOnInit(): void {
  }

  openReceipt(id: string): void {
    this.router.navigate([`/receipts/receipt/${id}`]);
  }

  applySelectedMeals(model: any) {
    const selectedMeal: any = {
      calories: model.pricePerServing,
      id: model.id,
      image: model.image,
      imageType: model.imageType,
      title: model.title
    }

    this.http.post('http://localhost:4000/api/products', { selectedMeal: selectedMeal }).subscribe((response: any) => {
      this.mealsService.todayMeals = response;
    })

  }

}
