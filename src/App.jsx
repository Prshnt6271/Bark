import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import * as Sentry from '@sentry/react';

import Home from './pages/Home'
import AdminLogin from "./components/AdminLogin";
import Register from "./pages/Register";
import ProfileSetup from "./components/ProfileSetup";

const App = () => {
  return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/pro" element={<ProfileSetup />} />

        
      </Routes>
  )
}

export default Sentry.withProfiler(App);
