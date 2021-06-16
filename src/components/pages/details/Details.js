import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import axios from "axios";

import { ThemeContext } from "../../../contexts/ThemeContext.js";

export default function Details() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;

  const { code } = useParams();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`);

        if (res.data.borders.length) {
          const borderCountriesCodes = res.data.borders.join(";");
          const response = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${borderCountriesCodes}`);

          setBorders(response.data.map(borderCountry => { 
            return {
              name: borderCountry.name,
              code: borderCountry.alpha2Code
            }
          }));
        }

        setCountry(res.data);
      } catch (error) {
        return alert(error);
      }
    }

    getCountry();
  }, [code]);

  const history = useHistory();
  const handleClickBackButton = () => history.push("/");
  const handleClickBorderCountry = code => history.push(`/${code}`);

  return (
    <div className="details-page" style={{ background: themes[theme].background }}>
      <div
        className="details-page__back-button" 
        onClick={handleClickBackButton}
        style={{ background: themes[theme].elements, color: themes[theme].foreground, boxShadow: themes[theme].boxShadow }}
      >
        <RiArrowLeftLine />
        <span>Back</span>
      </div>

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
                  <div
                    key={borderCountry.name}
                    className="details-page__border-country"
                    onClick={() => handleClickBorderCountry(borderCountry.code)}
                    style={{ background: themes[theme].elements, boxShadow: themes[theme].boxShadow }}
                  >{borderCountry.name}</div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}