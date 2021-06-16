import React, { createContext, useState, useEffect } from "react";

const themes = {
  light: {
    foreground: "hsl(200, 15%, 8%)",
    background: "hsl(0, 0%, 98%)",
    elements: "hsl(0, 0%, 100%)",
    input: "hsl(0, 0%, 52%)",
    boxShadow: "0 1px 5px 3px rgb(150 150 150 / 10%)"
  },
  dark: {
    foreground: "hsl(0, 0%, 100%)",
    background: "hsl(207, 26%, 17%)",
    elements: "hsl(209, 23%, 22%)",
    input: "hsl(0, 0%, 100%)",
    boxShadow: "0 1px 5px 5px rgb(0 0 0 / 10%)"
  }
}

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleChangeTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
    else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setTheme(theme);
  }, []);

  const state = {
    theme: [theme, setTheme],
    themes: [themes],
    handleChangeTheme: [handleChangeTheme]
  }

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
}