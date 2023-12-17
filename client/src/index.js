import history from '@/utils/history';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';


const root = document.getElementById('root');

ReactDOM.render(<React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  root
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
