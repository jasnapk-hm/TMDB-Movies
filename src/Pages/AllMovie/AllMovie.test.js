import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import AllMovie from "./AllMovie";
import useFetchApi from "../../Components/UseEfectComponent/UseEffectComponent";

jest.mock("../../Components/UseEfectComponent/UseEffectComponent");
jest.mock("../../Store/Action/MyFavoriteAction");

const mockStore = configureStore([thunk]);

describe("AllMovie Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: { favorites: [] },
    });
  });

  test("renders loading state", () => {
    useFetchApi.mockReturnValue([null, true, null]);
    render(
      <Provider store={store}>
        <AllMovie />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test("renders error state", () => {
    const error = { message: "Failed to get data" };
    useFetchApi.mockReturnValue([null, false, error]);
    render(
        <Provider store={store}>
          <AllMovie />
        </Provider>
      );

    expect(screen.getByText(/Error: Failed to get data/)).toBeInTheDocument();
  });

  test("renders no data available state", () => {
    useFetchApi.mockReturnValue([[]]);
    render(
      <Provider store={store}>
        <AllMovie />
      </Provider>
    );

    expect(screen.getByText(/No data available./i)).toBeInTheDocument();
  });
});
