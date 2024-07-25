import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import Header from "./Header";
import * as GenreActions from "../../Store/Action/GenreAction";

jest.mock("../../Store/Action/GenreAction");
jest.mock("../SubHeader/SubHeader", () =>
  jest.fn(() => <div>Subheader Component</div>)
);
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockStore = configureStore([thunk]);

const renderWithProviders = (store, ui, { route = "/" } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("Header component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    GenreActions.fetchGenres.mockImplementation(() => ({
      type: "FETCH_GENRES",
    }));
    GenreActions.removeUser.mockImplementation(() => ({
      type: "REMOVE_USER",
    }));
  });

  test("renders Header and dispatches fetchGenres action", () => {
    renderWithProviders(store, <Header />);
    expect(GenreActions.fetchGenres).toHaveBeenCalled();
  });

  test("renders Subheader component", () => {
    renderWithProviders(store, <Header />);
    expect(screen.getByText("Subheader Component")).toBeInTheDocument();
  });

  test("when TMDB Movies is clicked navigates to /home", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    renderWithProviders(store, <Header />);

    fireEvent.click(screen.getByText("TMDB Movies"));
    expect(navigate).toHaveBeenCalledWith("/home");
  });

  test("navigates to /favourites when My Favourites is clicked", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    renderWithProviders(store, <Header />);

    fireEvent.click(screen.getByText("My Favourites"));
    expect(navigate).toHaveBeenCalledWith("/favourites");
  });

  test("handles logout and navigates to /", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    renderWithProviders(store, <Header />);

    fireEvent.click(screen.getByTestId("account-icon-button"));
    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("User_ID")).toBeNull();
    expect(GenreActions.removeUser).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
