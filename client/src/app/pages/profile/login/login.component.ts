import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userModel: any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  onSubmit() {
    this.userModel = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.loginUser(this.userModel);
    }
  }
}
