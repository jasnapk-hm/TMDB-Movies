// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import AllMovie from './AllMovie';
// import { fetchAllMovies, addFavorite, removeFavorite } from '../../Store/Action/GenreAction';
// import CustomFetchApi from '../../Components/UseEfectComponent/UseEffectComponent';

// jest.mock('../../Store/Action/GenreAction', () => ({
//   fetchAllMovies: jest.fn(),
//   addFavorite: jest.fn(),
//   removeFavorite: jest.fn()
// }));

// jest.mock('../../Components/UseEfectComponent/UseEffectComponent', () => jest.fn());

// const mockStore = configureStore(thunk);

// describe('AllMovie Component', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       favorites: [],
//     });
//     jest.clearAllMocks();
//   });

//   test('renders loading state correctly', () => {
//     CustomFetchApi.mockReturnValue([[], true, null]);

//     render(
//       <Provider store={store}>
//         <Router>
//           <AllMovie />
//         </Router>
//       </Provider>
//     );

//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//   });

//   test('renders error state correctly', () => {
//     CustomFetchApi.mockReturnValue([[], false, { message: 'Error fetching data' }]);

//     render(
//       <Provider store={store}>
//         <Router>
//           <AllMovie />
//         </Router>
//       </Provider>
//     );

//     expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
//   });

//   test('renders no data state correctly', () => {
//     CustomFetchApi.mockReturnValue([[], false, null]);

//     render(
//       <Provider store={store}>
//         <Router>
//           <AllMovie />
//         </Router>
//       </Provider>
//     );

//     expect(screen.getByText('No data available.')).toBeInTheDocument();
//   });

//   test('renders movies correctly', () => {
//     const mockMovies = [
//       { id: 1, title: 'Movie 1', poster_path: 'path1.jpg', vote_average: 8.5, overview: 'Overview 1' },
//       { id: 2, title: 'Movie 2', poster_path: 'path2.jpg', vote_average: 7.5, overview: 'Overview 2' }
//     ];
//     CustomFetchApi.mockReturnValue([mockMovies, false, null]);

//     render(
//       <Provider store={store}>
//         <Router>
//           <AllMovie />
//         </Router>
//       </Provider>
//     );

//     expect(screen.getByText('Movie 1')).toBeInTheDocument();
//     expect(screen.getByText('Movie 2')).toBeInTheDocument();
//   });

//   test('handles favorite click correctly', () => {
//     const mockMovies = [
//       { id: 1, title: 'Movie 1', poster_path: 'path1.jpg', vote_average: 8.5, overview: 'Overview 1' },
//       { id: 2, title: 'Movie 2', poster_path: 'path2.jpg', vote_average: 7.5, overview: 'Overview 2' }
//     ];
//     CustomFetchApi.mockReturnValue([mockMovies, false, null]);
//     store = mockStore({
//       favorites: [{ id: 1 }],
//     });

//     render(
//       <Provider store={store}>
//         <Router>
//           <AllMovie />
//         </Router>
//       </Provider>
//     );

//     // Ensure the favorite button is in the document
//     const favoriteButton = screen.getAllByTestId('favorite-button')[0];
//     fireEvent.click(favoriteButton);

//     expect(store.getActions()).toContainEqual(removeFavorite(1));
//   });
// });
