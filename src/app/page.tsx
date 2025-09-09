import type { Country } from "@/types/country";

import CountryList from "@/components/country-list";

export const dynamic = "force-static";

async function fetchCountries(): Promise<Country[]> {
	const fields = ["capital", "flags", "name", "population", "region"];
	const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields.join(",")}`, {
		cache: "force-cache",
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
