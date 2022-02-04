import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface ProviderStateInterface {
  countries: any[];
  search: [string, React.Dispatch<React.SetStateAction<string>>];
  filter: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const CountriesContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const CountriesProvider: React.FC = ({ children }) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (countries.length) return;

    const getCountries = async () => {
      try {
        const { data } = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getCountries();
  }, [countries]);

  const state: ProviderStateInterface = {
    countries,
    search: [search, setSearch],
    filter: [filter, setFilter]
  };
  
  return (
    <CountriesContext.Provider value={state}>
      {children}
    </CountriesContext.Provider>
  );
}