import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Container from '@material-ui/core/Container'

import MediaItemSearchInput from './MediaItemSearchInput'
import MediaItemsTable from './MediaItems'
import MediaItemDetails from './details/MediaItemDetails'
import { GlobalStateProvider } from './GlobalStateContext'

function App() {
  return (
    <GlobalStateProvider>
      <Container maxWidth='lg'>
        <Router>
          <Switch>
            <Route path="/details/:mediaItemId">
              <MediaItemDetails />
            </Route>
            <Route path="/">
              <MediaItemSearchInput />
              <MediaItemsTable />
            </Route>
          </Switch>
        </Router>
      </Container>
    </GlobalStateProvider>
  )
}

export default App;
