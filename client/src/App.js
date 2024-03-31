// import logo from './logo.svg';
import './App.css';
import DashBoard from './Dashboard/DashBoard';
import FilterBoard from './Dashboard/FilterBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import { Provider } from "react-redux"
import Header from './Dashboard/Header';
import {store} from "../src/stores/store.js"
// import SearchName from './Dashboard/SearchName.js';
import Employee from './Dashboard/Employee.js';

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
              {/* <Route path="/login" element={<Login />}  ></Route>
        <Route path="/register" element={<Signup />}></Route> */}
              {/* <Route path="/profile" element={<UserProfile />} /> */}
              <Route path="/filter" element={<FilterBoard />} />
              <Route path="/employee" element={<Employee />} />
              {/* <Route path="/AddEmployee" element={<AddEmployee />} /> */}
              {/* <Route path="/UpdateEmployee" element={<UpdateEmployee />} /> */}

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
