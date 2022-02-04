import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../styles/components/country-item.module.scss";

interface PropsInterface {
  country: any;
};

const CountryItem: React.FC<PropsInterface> = ({ country }) => {
  return (
    <Link to={country.cca2}>
      <motion.div className={styles.country_item} whileHover={{ scale: 1.05, transition: { duration: 0.2, stiffness: 0 } }}>
        <div className={styles.image}>
          <img src={country.flags.png} alt={country.name.official} />
        </div>

        <div className={styles.informations}>
          <h2>{country.name.official}</h2>
          <h3>Population: <span>{country.population ? country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</span></h3>
          <h3>Region: <span>{country.region ? country.region : "N/A"}</span></h3>
          <h3>Capital: <span>{country.capital && country.capital.length ? country.capital[0] : "N/A"}</span></h3>
        </div>
      </motion.div>
    </Link>
  );
}

export default CountryItem;