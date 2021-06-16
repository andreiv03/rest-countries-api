import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ThemeContext } from "../../../../contexts/ThemeContext.js";

export default function CountryItem({ country }) {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const history = useHistory();
  const handleClick = () => history.push(`/${country.alpha2Code}`);

  return (
    <div className="country-item" onClick={handleClick} style={{ background: themes[theme].elements, color: themes[theme].foreground, boxShadow: themes[theme].boxShadow }}>
      <div className="country-item__image">
        <img src={country.flag} alt="The country's flag" />
      </div>

      <div className="country-item__info">
        <h2 className="country-item__name">{country.name}</h2>
        
        {
          country.population && <h3 className="country-item__text"><span>Population: </span>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
        }
        
        {
          country.region && <h3 className="country-item__text"><span>Region: </span>{country.region}</h3>
        }

        {
          country.capital && <h3 className="country-item__text"><span>Capital: </span>{country.capital}</h3>
        }
      </div>
    </div>
  );
}