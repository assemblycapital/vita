
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Config } from './components/Config/Config';

import { GlobalStateProvider } from './components/Global';
import { Metrics } from './components/Data/Metrics';


function App() {
  return (
    <GlobalStateProvider>
      <Router basename="/apps/vita">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config/:subdirectory" element={<Config />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
