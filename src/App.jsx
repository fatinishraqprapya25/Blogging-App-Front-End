import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
    </Routes>
  </>
}

export default App
