import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CaloryCounterService } from '../../shared/services/calory-counter.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-all-receipts',
  templateUrl: './all-receipts.component.html',
  styleUrls: ['./all-receipts.component.scss']
})
export class AllReceiptsComponent implements OnInit {
  public receiptList: any[] = [];
  public myMeals: any[]= [];
  public currentCalories: number = 0;
  public userCalories: any = {};

  private profile: any = {};

  constructor(private http: HttpClient, private userService: UserService, private calory: CaloryCounterService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    this.getReceipt();
    this.getTodayMeals();

    this.profile = await this.userService.getUsersProfile();
    this.setCalories();
  }

  setCalories() {
    this.userCalories = this.calory.getUserCalories(this.profile);
  }

  async getTodayMeals() {
    const params = new HttpParams().append('after', moment().startOf('day').toString()).append('before', moment().endOf('day').toString());
    this.myMeals = await this.http.get<any>('http://localhost:4000/api/products', {params}).toPromise();
    this.myMeals.map((i: any) => this.currentCalories = this.currentCalories + i.calories);
  }

  async getReceipt(): Promise<void> {
    const headers = {
      "Content-Type": "application/json",
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '3b5fd613a3msh9dd1a8798a15d07p140ed6jsn4a79698ec2b4'
    };

    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    const response = await this.http.get<any>(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random`, { ...requestOptions, params: { number: 6 } }).toPromise();
    this.receiptList = response.recipes;
  }
}
