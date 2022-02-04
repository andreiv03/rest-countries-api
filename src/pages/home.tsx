import { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";

import { CountriesContext } from "../contexts/countries-context";

import styles from "../styles/pages/home.module.scss";
import CountryItem from "../components/country-item";
import SelectInput from "../components/select-input";

const Home: React.FC = () => {
  const { countries, search: [search, setSearch], filter: [filter] } = useContext(CountriesContext);
  
  const filterCountries = () => {
    return countries.filter(country => {
      if (filter === country.region) {
        return ["official", "common"].some(field => {
          return country.name[field].toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      } else if (filter === "") {
        return ["official", "common"].some(field => {
          return country.name[field].toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      } else return false;
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.top_section}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search for a country..."
            autoComplete="off"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <RiSearchLine />
        </div>
        
        <SelectInput />
      </div>

      {countries.length ? (
        <div className={styles.countries}>
          {filterCountries().map((country, index) => (
            <CountryItem key={index} country={country} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Home;