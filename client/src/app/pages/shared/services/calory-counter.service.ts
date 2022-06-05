import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaloryCounterService {
  public userCalories: number = 1500;
  constructor() { }

  public getUserCalories(user: any) {
    const {gender, weight, height, age, activity} = user;
    this.userCalories = this.calculateBMI(gender, weight, height, age, activity);
    return this.userCalories;
  }

  private calculateBMI(gender: string, weight: number, height: number, age: number, activity: number) {
    let BMI: number = 0;

    if (gender === 'male') {
      BMI = 66 + (6.3 * this.convertWeight(weight)) + (12.9 * this.convertHeight(height)) - (6.8 * age)
    } else {
      BMI = 65.5 + (4.3 * this.convertWeight(weight)) + (4.7 * this.convertHeight(height)) - (4.7 * age)
    }

    return BMI * this.calculateActivity(activity)
  }

  private convertWeight(weight: number): number {
    return weight * 2.205
  }

  private convertHeight(height: number): number {
    return height * 0.394
  }

  private calculateActivity(activity: number): number {
    switch (activity) {
      case 0:
        return 1.2;
      case 1:
        return 1.375;
      case 2:
        return 1.55;
      case 3:
        return 1.9;
      default:
        return 1;
    }
  }
}
