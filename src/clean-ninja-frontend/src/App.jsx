import { clean_ninja_backend } from 'declarations/clean-ninja-backend';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Report from './pages/Report';
import WasteDetail from './pages/WasteDetail';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report" element={<Report />} />
            <Route path="/waste/:id" element={<WasteDetail />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;