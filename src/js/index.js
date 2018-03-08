import React from 'react';
import ReactDOM from 'react-dom';

// Add SCSS files to bundle
import '../styles/index.scss';

//Importing the Home class component
import {Home} from './Home.jsx';

// Render application to DOM
ReactDOM.render(
    <Home/>,
    document.querySelector('#app')
);