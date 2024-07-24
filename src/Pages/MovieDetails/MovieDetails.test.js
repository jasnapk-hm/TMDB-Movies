import React from 'react';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MovieDetails from './MovieDetails';
import * as useFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';

jest.mock('../../Components/UseEfectComponent/UseEffectComponent', () => ({
  __esModule: true,
  default: jest.fn(),
}));


const mockStore = configureStore([]);

const mockData = {
  id: 1,
  title: 'Mock Movie',
};

describe('MovieDetails Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
      movieDetails: {
        movies: [mockData],
        loading: false,
        error: null,
      },
    });
    useFetchApi.default.mockImplementation(() => [mockData, false, null]);
  });

  test('renders MovieDetails component', () => {
    render(
      <Provider store={store}>
        <Router>
          <MovieDetails />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Movie Details')).toBeInTheDocument();
  });



  test('displays movie details', () => {
    render(
      <Provider store={store}>
        <Router>
          <MovieDetails />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Mock Movie')).toBeInTheDocument();
  });

});
