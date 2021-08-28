import React, { useContext } from "react";

import "./home.css";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import { CountriesContext } from "../../contexts/CountriesContext.js";

import Utils from "../../components/utils/Utils.js";
import CountryItem from "../../components/country-item/CountryItem.js";
import Loader from "../../components/utils/loader/Loader.js";

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