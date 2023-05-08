import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import test1 from './test1';
import test2 from './test2';
import './App.css';

const routes = [
  { path: '/test1', component: test1 },
  { path: '/test2', component: test2 },
];

function App() {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Link className='sidebar-link' to="/test1">Go to Test 1</Link>
          <Link className='sidebar-link' to="/test2">Go to Test 2</Link>
        </div>
        <div className="main">
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
