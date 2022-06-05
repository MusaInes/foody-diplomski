import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  private initialValues: any = {};
  private userModel: any = {};
  private profileModel: any = {};

  public user: any = {};
  public profile: any = {};
  public edit: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) { }

  public registerForm = this.formBuilder.group({
    email: '',
    name: '',
    gender: 'female',
    weight: '',
    height: '',
    age: '',
    activity: '0'
  });

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.authService.isAuthenticated()) return;
    const {user, ...rest} = await this.userService.getUsersProfile();
    this.user = user;
    this.profile = rest
    console.log('user', user, rest);

    this.setFormModel();
  }

  setFormModel() {
    this.registerForm.patchValue({
      email: this.user.email,
      gender: this.profile.gender,
      weight: this.profile.weight,
      height: this.profile.height,
      age: this.profile.age,
      activity: this.profile.activity,
      name: this.user.name
    })
  }

  setEditMode(isEdit: boolean) {
    this.edit = isEdit;
  }

  editForm() {
    this.initialValues = this.registerForm.value;
    this.setEditMode(true);
  }

  resetForm() {
    this.registerForm.reset(this.initialValues);
    this.setEditMode(false);
  }

  deleteProfile() {
    if(window.confirm('Da li zaista želiš obrisati profil?')) {
      this.userService.deleteUserAndProfile();
      this.authService.logOutUser();
    }
  }

  onSubmit() {
    const {email, name, ...rest} = this.registerForm.value
    this.userModel = {email: email, name: name}
    this.profileModel = {...rest}
    if (this.registerForm.valid) {
      this.updateProfile();
    }
  }

  updateProfile() {
    this.authService.updateUser(this.userModel, this.profileModel);
    this.setEditMode(false);
  }

}
