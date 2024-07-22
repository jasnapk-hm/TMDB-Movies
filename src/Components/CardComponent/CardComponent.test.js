import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardComponenet from './CardComponent';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('CardComponenet', () => {
  const mockMovie = {
    id: 1,
    title: 'Movie 1',
    poster_path: 'path1.jpg',
    vote_average: 8.5,
    overview: 'This is an overview of Movie 1.',
  };

  const handleFavoriteClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('rendering the CardComponenet correctly', () => {
    render(
      <Router>
        <CardComponenet
          movie={mockMovie}
          isFavourite={false}
          handleFavoriteClick={handleFavoriteClick}
        />
      </Router>
    );

    expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Rating: 8.5')).toBeInTheDocument();
    expect(screen.getByText('This is an overview of Movie 1.')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });

  test('navigates to the correct movie page on image click', () => {
    render(
      <Router>
        <CardComponenet
          movie={mockMovie}
          isFavourite={false}
          handleFavoriteClick={handleFavoriteClick}
        />
      </Router>
    );

    fireEvent.click(screen.getByAltText('Movie 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });

 

  test('displays the filled favorite icon when isFavourite is true', () => {
    render(
      <Router>
        <CardComponenet
          movie={mockMovie}
          isFavourite={true}
          handleFavoriteClick={handleFavoriteClick}
        />
      </Router>
    );

    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
  });

});
