


import React, { Suspense,} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import store from './store/store';
import LoginPage from './pages/Login';
import GenrePage from './pages/GenrePage';
import Myfavorites from './pages/MyFavorites';
import MovieDetails from './pages/MoveDetailspage';
import Home from './pages/Home';
import ProtectedRoute from './Routing';

const App = () => {



  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/favourites" element={<ProtectedRoute><Myfavorites /></ProtectedRoute>} />
          <Route path="/home" element={  <ProtectedRoute><Home />  </ProtectedRoute>   } />
          <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          <Route path="/genere/:id" element={<ProtectedRoute><GenrePage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;