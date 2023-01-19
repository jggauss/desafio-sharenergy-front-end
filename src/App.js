import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import './App.css'
import { Authprovider } from './Context/AuthContext';

import RoutesAdm from './Routes/RoutesAdmin';
function App() {

  return (
    <Authprovider>
      <Router>
        <RoutesAdm />
      </Router>
    </Authprovider>

  );
}

export default App;
