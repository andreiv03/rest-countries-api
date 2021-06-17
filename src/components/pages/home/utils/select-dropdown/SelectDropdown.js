import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const optionsVariants = {
  initial: {
    height: 0
  },
  animate: {
    height: "auto"
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function SelectDropdown({ filter, setFilter, theme, themes }) {
  const [isActive, setIsActive] = useState(false);

  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChangeSelectInput = continent => {
    if (filter !== continent) setFilter(continent);
    else setFilter("");
  }

  return (
    <div className="select-dropdown" 
      style={{ background: themes[theme].elements, color: themes[theme].foreground, boxShadow: themes[theme].boxShadow }}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="select-dropdown__button">
        {
          !filter ? "Filter by region" : filter
        }

        <RiArrowDropDownLine />
      </div>
      
      <AnimatePresence>
        {
          isActive ?
            <motion.div
              className="select-dropdown__options"
              style={{ background: themes[theme].elements, boxShadow: themes[theme].boxShadow }}
              variants={optionsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {
                continents.map(continent => (
                  <motion.div key={continent} className="select-dropdown__option" 
                    onClick={() => handleChangeSelectInput(continent)}
                    whileHover={{ scale: 1.1, originX: 0 }}
                  >{continent}</motion.div>
                ))
              }
            </motion.div>
          : null
        }
      </AnimatePresence>
    </div>
  );
}