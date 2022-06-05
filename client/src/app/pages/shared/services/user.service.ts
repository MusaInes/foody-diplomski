import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: any;
  private _profile: any;
  private _userCalories: number;

  constructor(private http: HttpClient) {
    this._userCalories = 0;
  }

  public get user() : any {
    return this._user;
  }

  public set setUser(v : any) {
    this._user = v;
  }

  public get profile() : any {
    return this._profile;
  }

  public set setProfile(v : any) {
    this._profile = v;
  }

  public get calories() : number {
    return this._userCalories;
  }

  public set setCalories(v : number) {
    this._userCalories = v;
  }

  public async getLoggedInUser(): Promise<any> {
    const userModel = await this.http.get<any>('http://localhost:4000/api/login').toPromise();
    this._user = userModel
    await this.getUsersProfile();
    return this.user;
  }

  public async getUsersProfile(): Promise<any> {
    const profileModel = await this.http.get<any>('http://localhost:4000/api/profile/me').toPromise();
    this._profile = profileModel;
    return this.profile;
  }

  public async deleteUserAndProfile(): Promise<any> {
    await this.http.delete<any>('http://localhost:4000/api/profile').toPromise();
  }

  public async calculateUserCalories(): Promise<number> {
    this.setCalories = 0;
    return this.calories;
  }

}
