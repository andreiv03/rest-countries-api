import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import "./header.css";
import { ThemeContext } from "../../contexts/ThemeContext.js";

export default function Header() {
  const themeContext = useContext(ThemeContext);
  const [theme] = themeContext.theme;
  const [themes] = themeContext.themes;
  const [handleChangeTheme] = themeContext.handleChangeTheme;

  return (
    <div className="header" style={{ background: themes[theme].elements, boxShadow: themes[theme].boxShadow }}>
      <h2 className="header__title"><Link to="/" style={{ color: themes[theme].foreground }}>Where in the world?</Link></h2>

      <div className="header__theme-button" onClick={handleChangeTheme}>
        <div className="header__theme-button__icon" style={{ color: themes[theme].foreground }}>
          {
            theme === "light" ? <RiMoonFill /> : <RiSunFill />
          }
        </div>
        
        <div className="header__theme-button__text" style={{ color: themes[theme].foreground }}>
          {
            theme === "light" ? "Dark Mode" : "Light Mode"
          }
        </div>
      </div>
    </div>
  );
}