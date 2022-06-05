import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.scss']
})
export class MyMealsComponent implements OnInit, AfterViewInit {
  public myMeals: any = {}

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.getTodayMeals();
  }

  async ngAfterViewInit(): Promise<void> {

  }

  async getTodayMeals() {
    const params = new HttpParams().append('after', moment().startOf('day').toString()).append('before', moment().endOf('day').toString());
    this.myMeals = await this.http.get<any>('http://localhost:4000/api/products', {params}).toPromise();
    console.log('meals', this.myMeals);
  }

}
