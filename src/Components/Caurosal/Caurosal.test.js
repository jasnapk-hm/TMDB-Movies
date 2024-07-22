import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Caurosal from './Caurosal';
import { fetchPopularMovies } from '../../Store/Action/GenreAction';


jest.mock('../../Store/Action/GenreAction', () => ({
  fetchPopularMovies: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Caurosal Component', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: 'path1.jpg',
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: 'path2.jpg',
    },
  ];

  beforeEach(() => {
    fetchPopularMovies.mockResolvedValue({ results: mockMovies });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Caurosal component correctly', async () => {
    render(
      <Router>
        <Caurosal />
      </Router>
    );

    // Wait for the movies to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    });
  });

  test('navigates to the correct movie page on image click', async () => {
    render(
      <Router>
        <Caurosal />
      </Router>
    );

    // Wait for the movies to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    });

    // Simulate click event on the first movie image
    fireEvent.click(screen.getByAltText('Movie 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});
