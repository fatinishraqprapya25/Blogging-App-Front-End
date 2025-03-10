import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import SendResetPasswordCode from './components/auth/sendResetPasswordCode';
import ResetPassword from './components/auth/resetPassword';

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<SendResetPasswordCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  </>
}

export default App
