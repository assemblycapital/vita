
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Config } from './components/Config';
import { GlobalStateProvider } from './components/Global';


function App() {
  return (
    <GlobalStateProvider>
      <Router basename="/apps/vita">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config/:subdirectory" element={<Config />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
