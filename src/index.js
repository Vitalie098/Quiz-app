import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {Provider} from "react-redux"
import reducers from "./redux/reducers/rootReducers";
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers,applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
