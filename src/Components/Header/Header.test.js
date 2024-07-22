import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import { fetchGenres, removeUser } from "../../Store/Action/GenreAction";

jest.mock("../../Store/Action/GenreAction", () => ({
  fetchGenres: jest.fn(),
  removeUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);
const store = mockStore({
  genre: { genres: [] },
});

describe("Header Component", () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  test("renders the Header component correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText("TMDB Movies")).toBeInTheDocument();
    expect(screen.getByText("My Favourites")).toBeInTheDocument();
  });

  test("navigates to home when TMDB Movies is clicked", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("TMDB Movies"));
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("navigates to favourites when My Favourites is clicked", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("My Favourites"));
    expect(mockNavigate).toHaveBeenCalledWith("/favourites");
  });

  test("opens the menu when account icon is clicked", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("account-icon-button"));
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("dispatches removeUser and navigates to root on logout", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("account-icon-button"));
    fireEvent.click(screen.getByText("Logout"));

    expect(store.dispatch).toHaveBeenCalledWith(removeUser());
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("User_ID")).toBeNull();
  });

  test("dispatches fetchGenres on mount", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchGenres());
  });
});
