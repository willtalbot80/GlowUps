import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExpertBrowse from './pages/ExpertBrowse';
import ExpertDetail from './pages/ExpertDetail';
import BookAppointment from './pages/BookAppointment';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import ClientDashboard from './pages/ClientDashboard';
import ExpertDashboard from './pages/ExpertDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DepositPayment from './pages/DepositPayment';
import Reviews from './pages/Reviews';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse" component={ExpertBrowse} />
          <Route path="/experts/:id" component={ExpertDetail} />
          <Route path="/book/:expertId" component={BookAppointment} />
          <Route path="/confirmation" component={AppointmentConfirmation} />
          <Route path="/dashboard/client" component={ClientDashboard} />
          <Route path="/dashboard/expert" component={ExpertDashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/deposit/:appointmentId" component={DepositPayment} />
          <Route path="/reviews" component={Reviews} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;