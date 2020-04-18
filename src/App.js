import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import LinkListPage from './components/LinkListPage';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <LinkListPage />
          </Route>
          <Route path="/new">
            <p>Add New Link</p>
          </Route>
          <Route path="*">
            <p>Not Found</p>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
