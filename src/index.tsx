import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CountriesProvider } from "./contexts/countries-context";

import "./styles/globals.scss";
import styles from "./styles/components/layout.module.scss";
import Header from "./components/header";
import Home from "./pages/home";
import Country from "./pages/country";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return setTheme(theme);

    const isDefaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDefaultDark) setTheme("dark");
  }, []);

  return (
    <div className={styles.layout} data-theme={theme}>
      <CountriesProvider>
        <BrowserRouter>
          <Header theme={theme} switchTheme={switchTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:code" element={<Country />} />
          </Routes>
        </BrowserRouter>
      </CountriesProvider>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);