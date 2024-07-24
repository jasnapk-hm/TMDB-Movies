import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import GenrePage from "./GenrePage";
import * as useFetchApi from "../../Components/UseEfectComponent/UseEffectComponent";

jest.mock("../../Components/UseEfectComponent/UseEffectComponent", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockStore = configureStore([]);

const mockData = {
  id: 1,
  title: "Genere Movie",
  type: "Action",
};

describe("GenrePage Component", () => {
  let store;

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
    useFetchApi.default.mockImplementation(() => [mockData]);
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
