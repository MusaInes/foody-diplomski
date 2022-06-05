import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Profile, User } from '../../shared/models/foody.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private userModel: any;
  private profileModel: Profile;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.userModel = new User();
    this.profileModel = new Profile();
  }

  ngOnInit(): void {
  }

  public registerForm = this.formBuilder.group({
    email: '',
    password: '',
    password2: '',
    gender: 'female',
    weight: '',
    height: '',
    age: '',
    activity: '0'
  });

  onSubmit() {
    const {email, password, password2, ...rest} = this.registerForm.value
    console.log(email, password, password2);

    this.userModel = {email: email, password: password}
    this.profileModel = {...rest}

    if (this.registerForm.valid && password === password2) {
      this.registerUser();
    }
  }

  registerUser() {
    this.authService.registerUser(this.userModel, this.profileModel);
  }
}
