import type { Country } from "@/types/country";
import CountryList from "@/components/country-list";

async function fetchCountries(): Promise<Country[]> {
	const response = await fetch("https://restcountries.com/v3.1/all", {
		cache: "force-cache",
		next: { revalidate: 3600 },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch countries.");
	}

	return response.json();
}

export default async function Home() {
	const countries = await fetchCountries();
	return <CountryList countries={countries} />;
}
