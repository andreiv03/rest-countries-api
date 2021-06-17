import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";

import { ThemeContext } from "../../../../contexts/ThemeContext.js";
import { CountriesContext } from "../../../../contexts/CountriesContext.js";
import SelectDropdown from "./select-dropdown/SelectDropdown.js";

export default function Utils() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const countriesContext = useContext(CountriesContext);
  const [search, setSearch] = countriesContext.search;
  const [filter, setFilter] = countriesContext.filter;

  const handleChangeTextInput = event => setSearch(event.target.value);

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

      <SelectDropdown filter={filter} setFilter={setFilter} theme={theme} themes={themes} />
    </div>
  );
}