import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import styles from './styles/application.scss';

render(
<BrowserRouter>
    <App />
</BrowserRouter>
, document.getElementById('root'));
