import './static/css/font-awesome.css';
import './static/css/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Index from './components/Index';
import Intro from './components/Intro'
import resizeRoot from './utils/resizeRoot';

const app = document.querySelector('body');

resizeRoot();
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Index}/>
        <Route path="/intro" component={Intro}/>
    </Router>
), app);
