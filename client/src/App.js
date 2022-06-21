import {  BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/landing";
import AddProduct from "./pages/addProduct";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/adminDashboard";
import Complain from "./pages/complain";
import ComplainAdmin from "./pages/complainAdmin";
import Detail from "./pages/detailProduct";

// import "./styles/App.css";
import { API, setAuthToken } from './config/api';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/addProduct');
        // navigate("/complain-admin");
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Basic ' + localStorage.token,
        },
      };
      const response = await API.get('/check-auth', config);
      // If the token incorrect
      if (response.status === 'failed') {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      // console.log(response);
      // // Get user data
      let payload = response.data.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  

  return (
  
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/complain" element={<Complain />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />
      <Route path="/detail-product/:id" element={<Detail />} />
    </Routes>
  
  );
}

export default App;