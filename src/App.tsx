import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
