// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login-form/LoginForm";



const LoginPage = () => {


  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
   
       
       <LoginForm/>
      </div>
      <div
        className="w-1/2 bg-cover  bg-no-repeat bg-center"
        style={{ backgroundImage: `url('/login-bkg.jpeg')` }}
      >
        {/* La imagen de fondo cubre toda el área */}
      </div>
    </div>
  );
};

export default LoginPage;
