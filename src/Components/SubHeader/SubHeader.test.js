import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import SubHeader from "./SubHeader";
import { fetchGenres } from "../../Store/Action/GenreAction";
import { rootReducer } from "../../Store/reducers";

jest.mock("../../Store/Action/GenreAction", () => ({
  fetchGenres: jest.fn(),
}));

const mockStore = createStore(rootReducer);

const renderWithProviders = (ui, { store = mockStore } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("SubHeader", () => {
  it("should dispatch fetchGenres on mount", () => {
    renderWithProviders(<SubHeader />);

    expect(fetchGenres).toHaveBeenCalledTimes(1);
  });

 
});
