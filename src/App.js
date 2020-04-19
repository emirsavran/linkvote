import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LinkProvider } from './LinkContext';

import Layout from './components/Layout';
import ListPage from './components/ListPage';
import SubmitPage from './components/SubmitPage';

function App() {
  return (
    <Router>
      <LinkProvider>
        <Layout>
          <Switch>
            <Route exact path="/">
              <ListPage />
            </Route>
            <Route path="/new">
              <SubmitPage />
            </Route>
            <Route path="*">
              <p>Not Found</p>
            </Route>
          </Switch>
        </Layout>
      </LinkProvider>
    </Router>
  );
}

export default App;
