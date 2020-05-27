import React from 'react';
import './App.css';
import Menu from './components/l_menu/l_menu.js';
import Body from './components/body/body.js';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import rootReducer from './store/reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="back">
        <div className="App">
          <Menu />
          <Body />
        </div> 
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
