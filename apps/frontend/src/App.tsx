import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import MainNavbar from './General/MainNavbar';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import { Error } from './General/Error';
import Dashboard from './General/Dashbaord';

import 'bootstrap/dist/css/bootstrap.min.css';
// Use `createHashHistory` to use hash routing
const history = createBrowserHistory();

function App() {
  const { isLoading, error } = useAuth0();
  
  return (
    <Router history={history}>
      <Container fluid className="main" id="main-nav">
        <MainNavbar/>
      </Container>
      {error && <Error message={error.message} />}
      <Switch>
        <Container>
          <Route path="/" exact />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
