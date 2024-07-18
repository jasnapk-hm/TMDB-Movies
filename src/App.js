import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, } from 'react-router-dom';
import store from './Store/store';
import AppContent from './AppContent';

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
