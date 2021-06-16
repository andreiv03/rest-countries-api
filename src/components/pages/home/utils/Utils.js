import React, { useContext } from "react";
import { RiSearchLine, RiArrowDropDownLine } from "react-icons/ri";

import { ThemeContext } from "../../../../contexts/ThemeContext.js";
import { CountriesContext } from "../../../../contexts/CountriesContext.js";

export default function Utils() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const countriesContext = useContext(CountriesContext);
  const [search, setSearch] = countriesContext.search;
  const [filter, setFilter] = countriesContext.filter;

  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChangeTextInput = event => setSearch(event.target.value);
  const handleChangeSelectInput = event => setFilter(event.target.value);

  return (
    <div className="utils">
      <div className="utils__search">
        <input type="text" name="search" placeholder="Search for a country..." autoComplete="off" value={search} onChange={handleChangeTextInput}
          style={{ background: themes[theme].elements, color: themes[theme].input, boxShadow: themes[theme].boxShadow }}
        />
        
        <div className="utils__search-icon" style={{ color: themes[theme].input }}>
          <RiSearchLine />
        </div>
      </div>

      <div className="utils__filters">
        <select name="filter" value={filter} onChange={handleChangeSelectInput}
          style={{ background: themes[theme].elements, color: themes[theme].foreground, boxShadow: themes[theme].boxShadow }}
        >
          <option value="">Filter by region</option>

          {
            continents.map(continent => (
              <option key={continent} value={continent}>{continent}</option>
            ))
          }
        </select>

        <div className="utils__filters-arrow" style={{ color: themes[theme].foreground }}>
          <RiArrowDropDownLine />
        </div>
      </div>
    </div>
  );
}