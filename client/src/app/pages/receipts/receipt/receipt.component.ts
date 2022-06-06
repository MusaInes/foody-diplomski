import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodayMealsService } from '../../shared/services/today-meals.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  private params: any = {};

  public receiptInfo: any = {};
  public instructions: any = {};
  public nutrients: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private mealsService: TodayMealsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getReceipt(params.id)
    })
  }

  ngAfterViewInit(): void {
  }

  async getReceipt(id: number): Promise<void> {
    const headers = {
      "Content-Type": "application/json",
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '3b5fd613a3msh9dd1a8798a15d07p140ed6jsn4a79698ec2b4'
    };

    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    const response = await this.http.get<any>(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {...requestOptions, params: {includeNutrition: true}}).toPromise();

    this.receiptInfo = response;
    this.instructions = response.analyzedInstructions[0];
    this.nutrients = response.nutrition.nutrients.filter((i: any) => i.name === "Calories").reduce((a: any, v: any) => ({ ...a, ...v}), {});
  }

  applySelectedMeals() {
    const selectedMeal: any = {
      calories: this.nutrients.amount,
      id: this.receiptInfo.id,
      image: this.receiptInfo.image,
      imageType: this.receiptInfo.imageType,
      title: this.receiptInfo.title
    }

    this.http.post('http://localhost:4000/api/products', { selectedMeal: selectedMeal }).subscribe((response: any) => {
      this.mealsService.todayMeals = response;
    })

  }
}
