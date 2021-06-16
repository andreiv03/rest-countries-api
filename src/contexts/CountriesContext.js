import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CountriesContext = createContext();

export const CountriesContextProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        if (!search && !filter) {
          const res = await axios.get("https://restcountries.eu/rest/v2/all");

          setAllCountries(res.data);
          setCountries(res.data);
        } else {
          let newCountries = [];

          if (search) {
            newCountries = allCountries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
          }

          if (filter) {
            if (newCountries.length > 0) newCountries = newCountries.filter(country => country.region === filter);
            else newCountries = allCountries.filter(country => country.region === filter);
          }

          setCountries(newCountries);
        }
      } catch (error) {
        return alert(error);
      }
    }

    getCountries();
  }, [search, filter]);

  const state = {
    countries: [countries, setCountries],
    search: [search, setSearch],
    filter: [filter, setFilter]
  }

  return (
    <CountriesContext.Provider value={state}>
      {children}
    </CountriesContext.Provider>
  );
}