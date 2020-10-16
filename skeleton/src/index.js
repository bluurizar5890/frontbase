import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';

import './assets/scss/style.scss';
import { AppRouter } from './routers/AppRouter';
import Rutas from './routers/App';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

const app = (
    <Provider store={store}>
        <Rutas/>
    </Provider>
    // <Provider store={store}>
    //     <AppRouter/>
    // </Provider>
    // <Provider store={store}>
    //     <BrowserRouter basename={config.basename}>
    //         <App />
    //     </BrowserRouter>
    // </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// const app = (
//     <Provider store={store}>
//         <BrowserRouter basename={config.basename}>
//             <App />
//         </BrowserRouter>
//     </Provider>
// );

