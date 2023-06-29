import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { eRunMode } from './types';
import DataContext from './context';
import LocalDataContext from './local-store-context';
import RemoteDataContext from './remote-store-context';

import config from './config';
const dataContext = config.runMode === eRunMode.Local 
    ? LocalDataContext
    : RemoteDataContext;

ReactDOM.render(
    (<DataContext.Provider value={dataContext}>
        <App />
    </DataContext.Provider>)
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
