import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ExpertDetail from './pages/ExpertDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/expert/:id' component={ExpertDetail} />
      </Switch>
    </Router>
  );
};

export default App;