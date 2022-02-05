import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import styles from "../styles/pages/home.module.scss";
const CountryItem = dynamic(() => import("../components/country-item"));
const SelectInput = dynamic(() => import("../components/select-input"));

interface PropsInterface {
  countries: any[];
};

const Home: NextPage<PropsInterface> = ({ countries }) => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filterCountries = () => {
    return countries.filter(country => {
      switch (region) {
        case country.region: {
          return ["official", "common"].some(field => {
            return country.name[field].toLowerCase().indexOf(search.toLowerCase()) > -1;
          });
        }

        case "": {
          return ["official", "common"].some(field => {
            return country.name[field].toLowerCase().indexOf(search.toLowerCase()) > -1;
          });
        }

        default: return false;
      }
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.top_section}>
        <div className={styles.search}>
          <RiSearchLine />
          <input
            type="text"
            placeholder="Search for a country..."
            autoComplete="off"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>
        
        <SelectInput region={region} setRegion={setRegion} />
      </div>

      <div className={styles.countries}>
        {filterCountries().map(country => (
          <CountryItem key={country.cca2} country={country} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { default: countriesService } = await import("../services/countries-service");
  const { data } = await countriesService.getAllCountries();

  return {
    props: {
      countries: data
    },
    revalidate: 3600
  };
}

export default Home;