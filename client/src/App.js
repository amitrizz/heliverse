// import logo from './logo.svg';
import './App.css';
import DashBoard from './Dashboard/DashBoard';
import FilterBoard from './Dashboard/FilterBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import { Provider } from "react-redux"
import Header from './Dashboard/Header';
import { store } from "../src/stores/store.js"
import AddUser from './Dashboard/AddUser.js';
import UpdateUser from './Dashboard/UpdateUser.js';
import AddTeam from './Dashboard/AddTeam.js';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        {/* <Header /> */}
        <div className='body'>
          <Header />
          <div className='app'>
            <Navbar className='navbar' />
            <Routes>
              <Route path="/" element={<DashBoard />} ></Route>
              <Route path="/filter" element={<FilterBoard />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/updateuser" element={<UpdateUser />} />
              <Route path="/addteam" element={<AddTeam />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
