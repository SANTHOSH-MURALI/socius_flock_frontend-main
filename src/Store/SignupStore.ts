import { action, makeObservable, observable } from "mobx";
import SignupDataInterface from "../types/SignupDataInterface";
import { instance, signup_url } from "../types/GlobalConfig";

class SignupStore {
  signupData: SignupDataInterface | null = null;
  constructor() {
    makeObservable(this, {
      signupData: observable,
      setSignupData: action,
      makeSignup: action
    });
  }
  setSignupData(email: string, password: string, name: string) {
    this.signupData = {
      email: email,
      password: password,
      name: name
    };
  }
  async makeSignup() {
    try {
      await instance.post(signup_url, this.signupData);
      return {
        status: true,
        data: {
          title: 'Signup Success',
          text: 'User Signned-Up Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      };
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return {
          status: false,
          data: {
            title: 'Data Exist',
            text: 'Email Already Exists',
            icon: 'info',
            confirmButtonText: 'OK'
          }
        };
      }
      else {
        return {
          status: false,
          data: {
            title: 'Error',
            text: 'An error occurred during signup',
            icon: 'error',
            confirmButtonText: 'OK'
          }
        };
      }
    }
  }
}

const signupStore = new SignupStore();
export default signupStore;
