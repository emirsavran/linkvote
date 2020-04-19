import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import ListPage from './components/ListPage';
import LinkSubmitPage from './components/LinkSubmitPage';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <ListPage />
          </Route>
          <Route path="/new">
            <LinkSubmitPage />
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
