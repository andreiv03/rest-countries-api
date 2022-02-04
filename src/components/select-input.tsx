import { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import { CountriesContext } from "../contexts/countries-context";
import styles from "../styles/components/select-input.module.scss";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const optionsVariants = {
  initial: {
    height: 0
  },
  animate: {
    height: "auto",
    transition: {
      duration: 0.2,
    }
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

const SelectInput: React.FC = () => {
  const { filter: [filter, setFilter] } = useContext(CountriesContext);
  const [isOpen, setIsOpen] = useState(false);

  const switchRegion = (region: string) => {
    if (filter === region) setFilter("");
    else setFilter(region);
  }

  return (
    <div className={styles.select_input} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.button}>
        <span>{!filter ? "Filter by region" : filter}</span>
        <RiArrowDropDownLine />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.options} initial="initial" animate="animate" exit="exit" variants={optionsVariants}>
            {regions.map((region, index) => (
              <div key={index} className={styles.option} onClick={() => switchRegion(region)}>{region}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectInput;