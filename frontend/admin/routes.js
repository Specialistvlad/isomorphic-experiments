import React from 'react';
import { Route, IndexRoute } from 'react-router';

import config from './config';
import Layout from './layout';
import { notFound } from './components/container-shortcuts';
import Statistics from './modules/statistics/component';
import ExtensionsList from './modules/extensions/component';
import ExtensionsEdit from './modules/extension/component';
import ExtmodulesList from './modules/extmodules/component';
import ExtmoduleEdit from './modules/extmodule/component';

export default (
  <Route component={ Layout } path="/">
    <IndexRoute component={ ExtensionsList } />
    <Route path="statistics">
      <IndexRoute component={ Statistics } />
    </Route>
    <Route path="extensions">
      <IndexRoute component={ ExtensionsList } />
      <Route component={ ExtensionsEdit } path="new" />
      <Route component={ ExtensionsEdit } path=":id" />
    </Route>
    <Route path="extmodules">
      <IndexRoute component={ ExtmodulesList } />
      <Route component={ ExtmoduleEdit } path="new" />
      <Route component={ ExtmoduleEdit } path=":id" />
    </Route>
    {!config.node && <Route path='*' component={ notFound } />}
  </Route>
);
