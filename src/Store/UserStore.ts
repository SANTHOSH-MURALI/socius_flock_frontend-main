import { makeObservable, action, observable } from "mobx";
import UserData from "../types/UserDataInterface";
import { instance, user_details_url } from "../types/GlobalConfig";
import pageStore from "./PageStore";
import Skills from "../Components/Skills/Skills";

class UserStore {

  userData: UserData | null = null;
  constructor() {
    makeObservable(this, {
      userData: observable,
      fetchData: action,
      setData: action,
      clearData: action
    });
  }

  setData(email_id: string, name: string) {
    this.userData = {
      email_id: email_id,
      name: name
    }
  }
  async fetchData() {
    try {
      const response = await instance.get(user_details_url)
      const responseData = response.data
      this.setData(responseData.data.user_email, responseData.data.user_name)
      pageStore.setState(Skills)
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        return {
          status: false,
          data: {
            title: 'Session Expired',
            text: 'Please Make Login Again',
            icon: 'error',
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

  clearData = () => {
    this.userData = null
  }




}

const userStore = new UserStore();
export default userStore;