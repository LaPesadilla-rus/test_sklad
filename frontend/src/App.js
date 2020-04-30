import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './Users.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        HEADER
      </div>
      <div className="Menu">
        MENU  
      </div>
      <div className="Actions">
        Actions
      </div>
      <div className="DataBlock">
        Data block
        <Users />
      </div>
      
    </div>
      
    
  );
}

export default App;
