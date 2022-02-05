import axios from "./axios";

class CountriesService {
  getAllCountries() {
    return axios.get<any[]>("https://restcountries.com/v3.1/all");
  }
}

const countriesService = new CountriesService();
export default countriesService;