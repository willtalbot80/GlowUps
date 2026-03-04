import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ExpertBrowse from './pages/ExpertBrowse.js';
import Navbar from './components/Navbar.jsx';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/experts' component={ExpertBrowse} />
      </Switch>
    </Router>
  );
};

export default App;
