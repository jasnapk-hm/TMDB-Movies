import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MyFavorites from './MyFavorites';

const mockStore = configureStore([]);

describe('MyFavorites Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favorites: [
          { id: 1, title: 'Movie 1' },
        ],
      },
    });
  });

  test('renders MyFavorites component', () => {
    render(
      <Provider store={store}>
        <Router>
          <MyFavorites />
        </Router>
      </Provider>
    );

    expect(screen.getByText('MyFavorites')).toBeInTheDocument();
  });

  test('displays favorite movies', () => {
    render(
      <Provider store={store}>
        <Router>
          <MyFavorites />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
  });
});
