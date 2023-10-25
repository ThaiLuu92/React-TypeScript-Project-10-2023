import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SlideBar from './Components/SlideBar/SlideBar';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import UserManagement from './Pages/UserManagement/UserManagement';
import TeachersManagement from './Pages/TeachersManagement/TeachersManagement';
import CoursesManagement from './Pages/CoursesManagement/CoursesManagement';
import CourseLessonManagement from './Pages/CourseLessonManagement/CourseLessonManagement';
import OderManagement from './Pages/OderManagement/OderManagement';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState, loginSuccess, logout } from '../../project-admin-pages/src/Redux/Slice/appSlice';
import Login from './Components/Login/Login';
import CatagoryManagement from './Pages/CatagoryManagement/CatagoryManagement';
import axios from 'axios';


function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: { app: AuthState }) => state.app.isLoggedIn);
  const [isLogin, setIsLogin] = useState(isLoggedIn)


  async function checkLogin() {
    const isLogged = localStorage.getItem("loggedIn");
    if (isLogged) {
      const userId = JSON.parse(isLogged);
      const user = await axios.get("http://localhost:3000/admin", {
        params: { id: userId },
      });
      console.log(user);
      if (user.data.length) {
        setIsLogin(true)
        dispatch(loginSuccess(user.data[0]));
      }
    }
  }
  useLayoutEffect(() => {
    checkLogin();
  }, []); //


  return (
    <>
      <BrowserRouter>

        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userManagement" element={<UserManagement />} />
            <Route path="/teachersManagement" element={<TeachersManagement />} />
            <Route path="/catagoryManagement" element={<CatagoryManagement />} />
            <Route path="/coursesManagement" element={<CoursesManagement />} />
            <Route path="/courseLessonManagement" element={<CourseLessonManagement />} />
            <Route path="/oderManagement" element={<OderManagement />} />
          </Routes>

        ) : (
          <Login />

        )}


      </BrowserRouter>
    </>
  );
}

export default App;
