import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "./Login";
import { thunk } from "redux-thunk";

jest.mock("../../Store/Action/GenreAction");

const mockStore = configureStore([thunk]);

describe("LoginPage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: null,
    });
  });

  test("renders Login component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const loginDiv = screen.getByTestId("login-div");
    expect(loginDiv).toHaveClass("Login");
  });

  test("redirects to /home if user is already logged in", () => {
    store = mockStore({
      user: "some-user-id",
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(window.location.pathname).toBe("/home");
  });

  test("handles email and password input", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);

    fireEvent.change(emailInput, { target: { value: "abc@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc@123" } });

    expect(emailInput.value).toBe("abc@example.com");
    expect(passwordInput.value).toBe("abc@123");
  });
});
