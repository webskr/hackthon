import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import SubmitProject from './pages/SubmitProject';
import Admin from './pages/Admin';
import './index.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-project" element={<SubmitProject />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
