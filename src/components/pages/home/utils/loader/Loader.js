import React from "react";
import { motion } from "framer-motion";

const container = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

const block = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 2
    }
  }
}

export default function Loader({ theme, themes }) {
  return (
    <motion.div
      className="loader"
      variants={container}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
        <motion.div key={index} className="loader__block"
          variants={block}
          style={{ background: themes[theme].foreground }}
        />
      ))}
    </motion.div>
  );
}