import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/components/select-input.module.scss";

interface PropsInterface {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
};

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const optionsVariants = {
  initial: {
    height: 0
  },
  animate: {
    height: "auto",
    transition: {
      duration: 0.2
    }
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

const SelectInput: React.FC<PropsInterface> = ({ region, setRegion }) => {
  const [isOpen, setIsOpen] = useState(false);

  const switchRegion = (newRegion: string) => {
    if (region === newRegion) setRegion("");
    else setRegion(newRegion);
  }

  return (
    <div className={styles.select_input} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.button}>
        <span>{!region ? "Filter by region" : region}</span>
        <RiArrowDropDownLine />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.options} initial="initial" animate="animate" exit="exit" variants={optionsVariants}>
            {REGIONS.map((region, index) => (
              <div key={index} className={styles.option} onClick={() => switchRegion(region)}>{region}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectInput;