// SubHeader.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SubHeader from './SubHeader';
import { fetchGenres } from '../../Store/Action/GenreAction';

jest.mock('../../Store/Action/GenreAction', () => ({
  fetchGenres: jest.fn()
}));

const mockStore = configureStore([]);
const store = mockStore({
  genere: {
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' }
    ]
  }
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('SubHeader Component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  test('renders the genres correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <SubHeader />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });

  test('dispatches fetchGenres on mount', () => {
    render(
      <Provider store={store}>
        <Router>
          <SubHeader />
        </Router>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchGenres());
  });

  test('navigates to the correct genre page on chip click', () => {
    render(
      <Provider store={store}>
        <Router>
          <SubHeader />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Action'));
    expect(mockNavigate).toHaveBeenCalledWith('/genre/1', { state: { name: 'Action' } });
  });
});
