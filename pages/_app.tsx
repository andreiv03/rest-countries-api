import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "../styles/globals.scss";
const Header = dynamic(() => import("../components/header"));

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return setTheme(theme);

    const isDefaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDefaultDark) setTheme("dark");
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>REST Countries API</title>
      </Head>
      
      <HelmetProvider>
        <Helmet>
          <body data-theme={theme}/>
        </Helmet>

        <Header theme={theme} switchTheme={switchTheme} />
        <Component {...pageProps} />
      </HelmetProvider>
    </>
  );
}

export default App;