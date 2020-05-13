import React from 'react';
import './App.css';
import Menu from './components/l_menu/l_menu.js';
import Body from './components/body/body.js';

import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="back">
        <div className="App">
          <Menu />
          <Body />
        </div> 
      </div>
    </BrowserRouter>
  );
}

export default App;
