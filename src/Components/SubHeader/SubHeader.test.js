import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import SubHeader from './SubHeader';
import * as GenreActions from '../../Store/Action/GenreAction';

jest.mock('../../Store/Action/GenreAction');

const mockStore = configureStore([thunk]);

const renderWithProviders = (store, ui, { route = '/' } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('SubHeader', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      genere: {
        genere: {
          genres: [],
        },
      },
    });
    GenreActions.fetchGenres.mockImplementation(() => ({
      type: 'FETCH_GENRES',
    }));
  });

  test('dispatches fetchGenres action on mount', () => {
    renderWithProviders(store, <SubHeader />);
    expect(GenreActions.fetchGenres).toHaveBeenCalled();
  });

  test('renders genre chips based on the state', () => {
    const genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ];
    store = mockStore({
      genere: {
        genere: {
          genres,
        },
      },
    });

    renderWithProviders(store, <SubHeader />);

    genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });



  test('does not render any chips if genres are not available', () => {
    renderWithProviders(store, <SubHeader />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});