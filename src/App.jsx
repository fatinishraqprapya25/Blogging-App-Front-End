import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import SendResetPasswordCode from './components/auth/sendResetPasswordCode';
import ResetPassword from './components/auth/resetPassword';
import BlogDetail from './components/blogs/BlogDetail';
import Write from './components/blogs/Write';

const App = () => {
  return <>
    <Routes>
      {/* auth routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<SendResetPasswordCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* blog routes */}
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  </>
}

export default App
