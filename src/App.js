import React from 'react';
import employees from './Components/employees';
import prizes from './Components/prizes';
import achievements from './Components/achievements';
import employeesDetail from './Container/employeesDetail';
import prizesDetail from './Container/prizesDetail';
import NotFound from './Components/NotFound';
import Navbar from './Components2/Navbar';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Redirect to="/employees" />
          )}
        />
        <Route exact path="/employees" component={employees} />  
        <Route exact path="/employees/:id" component={employeesDetail} />
        <Route exact path="/prizes" component={prizes} />
        <Route exact path="/prizes/:id" component={prizesDetail} />
        <Route exact path="/achievements" component={achievements} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );

}

export default App;
