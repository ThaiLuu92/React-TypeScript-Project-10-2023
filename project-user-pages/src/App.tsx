import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Courses from './Pages/Courses/Courses';
import CoursesDetail from './Pages/Course-Detail/CoursesDetail';
import UserProfile from './Pages/User/UserProfile';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import User from './Pages/User';
import MyCourse from './Pages/User/MyCourse';
import MyPayment from './Pages/User/MyPayment';
import Checkout from './Components/CheckOut/Checkout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from './Redux/Slice/AuthSlice';



function App() {

  const dispatch = useDispatch();
  async function checkLogin() {
    const isLogged = localStorage.getItem("loggedIn");
    if (isLogged) {
      const userId = JSON.parse(isLogged);
      const user = await axios.get("http://localhost:3000/users", {
        params: { id: userId },
      });
      console.log(user);
      if (user.data.length) {
        dispatch(loginSuccess(user.data[0]));
      }
    }
  }
  useEffect(() => {
    checkLogin();
  }, []); 
  return (
    
    <>
     <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/CheckOut' element={<Checkout />} />
        <Route path='/japaneseCourses/:id' element={<CoursesDetail />} />
        <Route path='/User' element={<User />} >
          <Route index element={<UserProfile />} />
          <Route path='MyCourse' element={<MyCourse />} />
          <Route path='MyPayment' element={<MyPayment />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
