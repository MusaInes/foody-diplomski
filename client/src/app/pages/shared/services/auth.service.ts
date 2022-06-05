import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile, User } from '../models/foody.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private user: UserService) {}

  public async loginUser(userModel: any): Promise<void> {
    if (!userModel) return;
    const userResponse = await this.http.post<any>('http://localhost:4000/api/login', userModel).toPromise();

    if (!userResponse) return;
    this.setToken(userResponse.token)

    if (!this.isAuthenticated()) return;
    // await this.user.getLoggedInUser();
    this.navigateToHome();
  }

  public async getLoggedInUser(): Promise<any> {
    // return await this.http.get<any>('http://localhost:4000/api/login').toPromise();
  }

  public async getLoggedInProfile() {
    // const profile = await this.http.post<any>('http://localhost:4000/api/profile', profileModel).toPromise();
  }

  public async registerUser(userModel: User, profileModel: Profile): Promise<void> {
    const userResponse = await this.http.post<any>('http://localhost:4000/api/users', userModel).toPromise();

    if (!userResponse) return;
    this.setToken(userResponse.token)


    if (!this.isAuthenticated()) return
    const profile = await this.http.post<any>('http://localhost:4000/api/profile', profileModel).toPromise();

    if (!profile) return;
    await this.user.getLoggedInUser();
    this.navigateToHome();

  }

  public async updateUser(userModel: User, profileModel: Profile): Promise<void> {
    try {
      await this.http.post<any>('http://localhost:4000/api/users/update', userModel).toPromise();
      await this.http.post<any>('http://localhost:4000/api/profile', profileModel).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    // if (this.isAuthenticated()) {
    //   this.navigateToHome();
    // }
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  private navigateToHome(): void {
    this.router.navigate(['']);
  }

  public logOutUser(): void {
    localStorage.clear();
    this.user.setUser = {};
    this.router.navigate(['login'])
  }

  public isAuthenticated(): boolean {
    const token = this.getToken() || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }


}
