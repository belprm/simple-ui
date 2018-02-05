import "babel-polyfill";
import 'whatwg-fetch'

import './style/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

ReactDOM.render(<App/>, document.getElementById("root"));