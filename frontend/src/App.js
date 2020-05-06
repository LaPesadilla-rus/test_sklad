import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/l_menu/l_menu.js';
import Actions from './components/actions_bar/actions.js';
import Header from './components/header/header.js';
import Data_Block from './components/data_block/data_block.js';
//import * as imports from './imports.js';
//import Imports from './Imports.js';

import {Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Header />
        
        <Actions />
        <Data_Block />

      </div> 
    </BrowserRouter>
  );
}

export default App;
