import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ExpertBrowse from './pages/ExpertBrowse.js';
import './index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/experts' component={ExpertBrowse} />
      </Switch>
    </Router>
  );
};

export default App;
