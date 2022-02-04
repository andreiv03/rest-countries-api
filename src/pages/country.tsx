import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CountriesContext } from "../contexts/countries-context";

const Country: React.FC = () => {
  const { countries } = useContext(CountriesContext);
  const { code } = useParams();

  const [country, setCountry] = useState<any>({});
  const [borders, setBorders] = useState<any[]>([]);

  useEffect(() => {
    const getCountry = async () => {
      const foundCountry = countries.find(country => country.cca2 === code);
      if (foundCountry.borders && foundCountry.borders.length) {
        const foundBorders = countries.filter(country => foundCountry.borders.includes(country.cca2));
        setBorders(foundBorders.map(border => { 
          return {
            name: border.name.official,
            code: border.cca2
          }
        }));
      }
    }

    getCountry();
  }, [countries, code, country]);

  return (
    <div>

    </div>
  );
}

export default Country;