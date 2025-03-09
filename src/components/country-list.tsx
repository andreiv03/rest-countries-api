"use client";

import Image from "next/image";
import { useEffect, useMemo, useReducer, useRef } from "react";

import type { Country } from "@/types/country";

import Filters, { ITEMS_PER_PAGE, reducer } from "@/components/filters";
import styles from "@/styles/components/country-list.module.scss";

interface Props {
	countries: Country[];
}

const formatPopulation = (population: number): string => {
	return population.toLocaleString("en-US");
};

const formatCapital = (capital?: string[]): string => {
	return capital && capital.length ? capital.join(", ") : "N/A";
};

export default function CountryList({ countries }: Props) {
	const [state, dispatch] = useReducer(reducer, {
		search: "",
		region: "",
		visibleCount: ITEMS_PER_PAGE,
	});

	const loadMoreRef = useRef<HTMLDivElement>(null);

	const filteredCountries = useMemo(() => {
		return countries.filter((country) => {
			const matchesSearch = ["official", "common"].some((field) =>
				country.name[field as "official" | "common"].toLowerCase().includes(state.search),
			);

			const matchesRegion = !state.region || country.region === state.region;
			return matchesSearch && matchesRegion;
		});
	}, [countries, state.search, state.region]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting) {
					dispatch({ type: "LOAD_MORE", payload: state.visibleCount + ITEMS_PER_PAGE });
				}
			},
			{ threshold: 1.0 },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [state.visibleCount]);

	return (
		<>
			<Filters state={state} dispatch={dispatch} />

			<div className={styles["country_list"]}>
				{filteredCountries.slice(0, state.visibleCount).map((country, index) => (
					<div className={styles["country"]} key={index}>
						<div className={styles["image"]}>
							<Image
								alt={country.name.official}
								src={country.flags.png}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								loading="lazy"
							/>
						</div>

						<div className={styles["informations"]}>
							<h2>{country.name.official}</h2>
							<h3>
								Population: <span>{formatPopulation(country.population)}</span>
							</h3>

							<h3>
								Region: <span>{country.region}</span>
							</h3>

							<h3>
								Capital: <span>{formatCapital(country.capital)}</span>
							</h3>
						</div>
					</div>
				))}
			</div>

			<div className={styles["load_more"]} ref={loadMoreRef} />
		</>
	);
}
