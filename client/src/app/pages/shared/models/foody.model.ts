export class User {
  private _user: any;

  constructor() {
    this._user = {
      email: '',
      password: '',
      avatar: '',
      isAdmin: false
    }
  }

  public get getUser(): User {
    return this._user;
  }

  public set setUser(v : any) {
    this._user = v;
  }
}

export class Profile {
  private _profile: any;

  constructor() {
    this._profile = {
      gender: 'female',
      weight: '',
      height: '',
      age: '',
      activity: '0'
    };
  }

  public set setProfile(v : any) {
    this._profile = v;
  }

  public get getProfile() : Profile {
    return this._profile;
  }
}
