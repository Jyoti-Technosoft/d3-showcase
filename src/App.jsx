import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./components/CustomContext";
import DefaultLayout from "./layout/DefaultLayout";

import "./scss/style.scss";
class App extends Component {
  render() {
    return (
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    );
  }
}

export default App;
