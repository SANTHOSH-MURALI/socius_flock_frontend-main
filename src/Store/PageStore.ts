import { makeObservable,action,observable } from "mobx";
import Login from "../Components/Login/Login";



class PageStore{

  currentState : any = Login;
  constructor(){
    makeObservable(this,{
      currentState : observable,
      setState : action,
    });
  }
  setState(page : any){
    this.currentState = page
  }
}

const pageStore = new PageStore();
export default pageStore;