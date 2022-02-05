import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import "../styles/globals.scss";
import styles from "../styles/components/layout.module.scss";
const Header = dynamic(() => import("../components/header"));

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState("light");
  
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return setTheme(theme);

    const isDefaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDefaultDark) setTheme("dark");
  }, []);

  return (
    <div className={styles.layout} data-theme={theme}>
      <Header theme={theme} switchTheme={switchTheme} />
      <Component {...pageProps} />
    </div>
  );
}

export default App;