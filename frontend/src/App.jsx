import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from '../pages/Homepage/Homepage';
import ExamplePage from '../pages/Homepage/ExamplePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/example" element={<ExamplePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
