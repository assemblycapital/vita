
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Deployer } from './components/Deployer';
import { Config } from './components/Config';


function App() {
  return (
    <Router basename="/apps/vita">
      <Routes>
        <Route path="/" element={<Deployer />} />
        <Route path="/config/:subdirectory" element={<Config />} />
      </Routes>
    </Router>
  );
}

export default App;
