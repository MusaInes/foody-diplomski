import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayMealsService {
  private _todayMeals: any

  constructor() { }


  public get todayMeals() : any {
    return this._todayMeals;
  }


  public set todayMeals(v : any) {
    this._todayMeals = v;
  }


}
