import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaloryCounterService } from 'src/app/pages/shared/services/calory-counter.service';
import { TodayMealsService } from 'src/app/pages/shared/services/today-meals.service';
import { UserService } from 'src/app/pages/shared/services/user.service';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any[]>();

  public mealList: any[] = [];
  public mealType: any[] = ['Doručak', 'Ručak', 'Večera'];
  public selectedMeals: any[] = [];

  constructor(private http: HttpClient, private calorieService: CaloryCounterService, private mealsService: TodayMealsService) { }

  ngOnInit(): void {
    this.mealList = [
      {
          "id": 238512,
          "title": "Curried Shrimp with Peanuts",
          "image": "https://spoonacular.com/recipeImages/238512-312x231.jpg",
          "imageType": "jpg",
          "calories": 272,
          "protein": "40g",
          "fat": "8g",
          "carbs": "7g"
      },
      {
          "id": 284420,
          "title": "Chocolate Silk Pie with Marshmallow Meringue",
          "image": "https://spoonacular.com/recipeImages/284420-312x231.jpg",
          "imageType": "jpg",
          "calories": 226,
          "protein": "2g",
          "fat": "10g",
          "carbs": "33g"
      },
      {
          "id": 716723,
          "title": "Ruth Reichl's Savory Sweet Pasta for Michael",
          "image": "https://spoonacular.com/recipeImages/716723-312x231.jpg",
          "imageType": "jpg",
          "calories": 550,
          "protein": "26g",
          "fat": "11g",
          "carbs": "86g"
      }
  ]
  }

  ngAfterViewInit(): void {
    // this.getMeals();
  }

  saveSelectedMeals(selectedMeals: any[]) {
    this.http.post('http://localhost:4000/api/products', {selectedMeal: selectedMeals}).subscribe((response: any) => {
      this.mealsService.todayMeals = response;
      console.log('response', this.mealsService.todayMeals);
    })
  }

  applySelectedMeals() {
    if (!this.selectedMeals) return;
    let temp: any[] = [];
    this.selectedMeals.map((i: any, index: number) => {
      if (this.mealList[index]) {
        temp.push(this.mealList[index])
      }
    })

    console.log(temp);
    this.saveSelectedMeals(temp);

  }

  setSelectedMeals(values: any, item: number) {
    if (values.currentTarget.checked) {
      this.selectedMeals.push(item)
    } else {
      let index = this.selectedMeals.indexOf(item);
      if (index !== -1) {
        this.selectedMeals.splice(index, 1);
      }
    }
    this.newItemEvent.emit(this.selectedMeals)
  }

  getMeals(): void {
    const headers = {
      "Content-Type": "application/json",
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '3b5fd613a3msh9dd1a8798a15d07p140ed6jsn4a79698ec2b4'
    };

    const params = {maxCalories: this.calorieService.userCalories, number: 3};

    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    this.http.get<any>('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients', {...requestOptions, params: params}).subscribe((response: any) => {
      this.mealList = response;
    })
  }

}
