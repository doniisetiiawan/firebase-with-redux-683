import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Error404 from './components/Error/404';
import Phrases from './components/Phrases';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Phrases} exact />
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
