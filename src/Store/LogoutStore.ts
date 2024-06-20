
import { makeObservable, action } from "mobx";
import Login from "../Components/Login/Login";
import { instance, logout_url } from "../types/GlobalConfig";
import pageStore from "./PageStore";

class LogoutStore {

  constructor() {
    makeObservable(this, {
      makeLogout: action,
    });
  }
  async makeLogout() {
    try {
      await instance.get(logout_url);
      pageStore.setState(Login)
      return {
        title: 'Logout Success',
        text: 'User Logged-out Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }
    }catch(error:any){
      pageStore.setState(Login)
      return {
        title: 'Logout Failed',
        text: 'Please Login Again',
        icon: 'failure',
        confirmButtonText: 'OK'
      }
    }
  }
}

const logoutStore = new LogoutStore();
export default logoutStore;