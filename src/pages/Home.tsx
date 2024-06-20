import { observer } from "mobx-react";
import Header from "../Components/Header/Header";
import pageStore from "../Store/PageStore";

const Home : React.FC = observer(() => {
  return (
    <div className="main-container">
      <Header/>
      {<pageStore.currentState/>}
    </div>
  )
});

export default Home;
