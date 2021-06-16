import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeContextProvider } from "./contexts/ThemeContext.js";
import { CountriesContextProvider } from "./contexts/CountriesContext.js";

import Header from "./components/header/Header.js";
import Pages from "./components/pages/Pages.js";

export default function App() {
  return (
    <ThemeContextProvider>
      <CountriesContextProvider>
        <BrowserRouter basename="/rest-countries-api">
          <Header />
          <Pages />
        </BrowserRouter>
      </CountriesContextProvider>
    </ThemeContextProvider>  
  );
}