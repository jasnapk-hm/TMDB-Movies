import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import GenrePage from "./GenrePage";
import * as useFetchApi from "../../Components/UseEfectComponent/UseEffectComponent";
import { MemoryRouter } from 'react-router-dom';

jest.mock("../../Components/UseEfectComponent/UseEffectComponent", () => ({
  __esModule: true,
  default: jest.fn(),
}));


const renderWithProviders = (store, ui, { route = '/' } = {}) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </Provider>
    );
  };
const mockStore = configureStore([]);

const mockData = {
  id: 1,
  title: "Genere Movie",
  type: "Action",
};

describe("GenrePage Component", () => {
  let store;
  const mockFetchParticularGenereData = jest.fn();

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
      allMovies: {
        allmovie: [mockData],
        loading: false,
        error: null,
      },
    });
    useFetchApi.default.mockImplementation(() => [mockData, false, null]);
  });

  test("renders GenrePage component", () => {
    render(
      <Provider store={store}>
        <Router>
          <GenrePage />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Genredetails page")).toBeInTheDocument();
  });

  

});
