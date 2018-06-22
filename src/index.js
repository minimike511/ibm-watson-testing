import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

let rootElement = document.getElementById('app');
render(
    <App />,
    rootElement
);