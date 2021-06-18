import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";

import { ThemeContext } from "../../../contexts/ThemeContext.js";
import { CountriesContext } from "../../../contexts/CountriesContext.js";

export default function Details() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const countriesContext = useContext(CountriesContext);
  const [allCountries] = countriesContext.allCountries;

  const { code } = useParams();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const foundCountry = allCountries.find(country => country.alpha2Code === code);

        if (foundCountry?.borders.length) {
          const foundBorders = allCountries.filter(country => foundCountry.borders.includes(country.alpha3Code));

          setBorders(foundBorders.map(borderCountry => { 
            return {
              name: borderCountry.name,
              code: borderCountry.alpha2Code
            }
          }));
        }

        setCountry(foundCountry);
      } catch (error) {
        return alert(error);
      }
    }

    getCountry();
  }, [allCountries, code]);

  const history = useHistory();
  const handleClickBackButton = () => history.push("/");
  const handleClickBorderCountry = code => history.push(`/${code}`);

  if (!country) return null;

  return (
    <div className="details-page" style={{ background: themes[theme].background }}>
      <motion.div
        className="details-page__back-button" 
        onClick={handleClickBackButton}
        style={{ background: themes[theme].elements, color: themes[theme].foreground, boxShadow: themes[theme].boxShadow }}
        whileTap={{ scale: 0.9 }}
      >
        <RiArrowLeftLine />
        <span>Back</span>
      </motion.div>

      <div className="details-page__country">
        <div className="details-page__image">
          <img src={country.flag} alt="The country's flag" />
        </div>

        <div className="details-page__info" style={{ color: themes[theme].foreground }}>
          <h2>{country.name}</h2>

          <div className="details-page__row">
            <div className="details-page__column" style={{ color: themes[theme].foreground }}>
              {
                country.nativeName && <h3 className="details-page__column-text"><span>Native Name: </span>{country.nativeName}</h3>
              }

              {
                country.population && <h3 className="details-page__column-text"><span>Population: </span>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
              }

              {
                country.region && <h3 className="details-page__column-text"><span>Region: </span>{country.region}</h3>
              }

              {
                country.subregion && <h3 className="details-page__column-text"><span>Sub Region: </span>{country.subregion}</h3>
              }

              {
                country.capital && <h3 className="details-page__column-text"><span>Capital: </span>{country.capital}</h3>
              }
            </div>

            <div className="details-page__column" style={{ color: themes[theme].foreground }}>
              {
                country.topLevelDomain && <h3 className="details-page__column-text"><span>Top Level Domain: </span>{country.topLevelDomain[0]}</h3>
              }

              {
                country.currencies && <h3 className="details-page__column-text"><span>Currencies: </span>{country.currencies.map(currency => currency.name).join(", ")}</h3>
              }

              {
                country.languages && <h3 className="details-page__column-text"><span>Languages: </span>{country.languages.map(language => language.name).join(", ")}</h3>
              } 
            </div>
          </div>

          <div className="details-page__row" style={{ color: themes[theme].foreground }}>
            {
              borders.length > 0 && <h3 className="details-page__border-countries__text">Border Countries:</h3>              
            }

            <div className="details-page__border-countries">
              {
                borders && borders.map(borderCountry => (
                  <motion.div
                    key={borderCountry.name}
                    className="details-page__border-country"
                    onClick={() => handleClickBorderCountry(borderCountry.code)}
                    style={{ background: themes[theme].elements, boxShadow: themes[theme].boxShadow }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {borderCountry.name}
                  </motion.div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}