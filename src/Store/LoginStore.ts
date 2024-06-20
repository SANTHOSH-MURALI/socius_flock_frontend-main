import { action, makeObservable, observable } from "mobx";
import LoginDataInterface from "../types/LoginDataInterface";
import { instance, login_url } from "../types/GlobalConfig";

class LoginStore {
  loginData: LoginDataInterface | null = null;


  constructor() {
    makeObservable(this, {
      loginData: observable,
      makeLogin: action
    });
  }

  setLoginData(email: string, password: string) {
    this.loginData = {
      email: email,
      password: password
    };
  }

  async makeLogin() {
    try {
      await instance.post(login_url, this.loginData);
      return {
        status: true,
        data: {
          title: 'Login Success',
          text: 'User Logged-In Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }
      };
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        return {
          status: false,
          data: {
            title: 'Unauthorized',
            text: 'worng password',
            icon: 'error',
            confirmButtonText: 'OK'
          }
        };
      }
      else if (error.response && error.response.status === 404){
        return {
          status : false,
          data: {
            title: 'User Not Found',
            text: 'The give user email doesn\'t exist',
            icon: 'info',
            confirmButtonText: 'OK'
          }
        }
      }
      else {
        return {
          status: false,
          data: {
            title: 'Error',
            text: 'An error occurred during login',
            icon: 'error',
            confirmButtonText: 'OK'
          }
        };
      }
    }
  }
}

const loginStore = new LoginStore();
export default loginStore;
