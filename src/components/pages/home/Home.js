import React, { useContext } from "react";

import { ThemeContext } from "../../../contexts/ThemeContext.js";
import { CountriesContext } from "../../../contexts/CountriesContext.js";
import Utils from "./utils/Utils.js";
import CountryItem from "./country-item/CountryItem.js";
import Loader from "./utils/loader/Loader.js";

export default function Home() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const countriesContext = useContext(CountriesContext);
  const [countries] = countriesContext.countries;

  return (
    <div className="home-page" style={{ background: themes[theme].background }}>
      <Utils />

      {
        countries.length ? (
          <div className="home-page__countries">
            {
              countries.map(country => (
                <CountryItem key={country.name} country={country} />
              ))
            }
          </div>
        ) : <Loader theme={theme} themes={themes} />
      }
    </div>
  );
}