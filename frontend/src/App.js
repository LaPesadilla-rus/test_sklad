import React from 'react';
import './App.css';
/*import Menu from './components/modules/l_menu/l_menu.js';
//import Body from './components/body/body.js';
import Routs from './components/routs/routs';
import {AuthProvider} from "./Auth";

import {BrowserRouter} from 'react-router-dom';*/

import AppContainer from './AppContainer';

import {Provider} from 'react-redux';
import rootReducer from './store/reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
{/*<BrowserRouter>
      <div className="back">
        <div className="App">
          <Menu />
          <Routs />
        </div> 
      </div>
    </BrowserRouter>*/}
    </Provider>
  );
}

export default App;
