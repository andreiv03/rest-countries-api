import type { ActionDispatch } from "react";
import { RiSearchLine } from "react-icons/ri";

import SelectInput from "@/components/select-input";
import styles from "@/styles/components/filters.module.scss";

interface FiltersState {
	search: string;
	region: string;
	visibleCount: number;
}

type FiltersAction =
	| { type: "UPDATE_SEARCH"; payload: string }
	| { type: "UPDATE_REGION"; payload: string }
	| { type: "LOAD_MORE"; payload: number };

export const ITEMS_PER_PAGE = 20;
const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export const reducer = (state: FiltersState, action: FiltersAction): FiltersState => {
	switch (action.type) {
		case "UPDATE_SEARCH":
			return { ...state, search: action.payload.trim().toLowerCase() };

		case "UPDATE_REGION":
			return { ...state, region: action.payload };

		case "LOAD_MORE":
			return { ...state, visibleCount: action.payload };

		default:
			return state;
	}
};

export default function Filters({
	state,
	dispatch,
}: {
	state: FiltersState;
	dispatch: ActionDispatch<[action: FiltersAction]>;
}) {
	const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "UPDATE_SEARCH", payload: event.target.value });
		dispatch({ type: "LOAD_MORE", payload: ITEMS_PER_PAGE });
	};

	const updateRegion = (region: string) => {
		dispatch({ type: "UPDATE_REGION", payload: region });
		dispatch({ type: "LOAD_MORE", payload: ITEMS_PER_PAGE });
	};

	return (
		<div className={styles["filters"]}>
			<div className={styles["search"]}>
				<RiSearchLine />
				<input
					autoComplete="off"
					onChange={updateSearch}
					placeholder="Search for a country..."
					type="text"
				/>
			</div>

			<SelectInput
				option={state.region}
				setOption={updateRegion}
				placeholder="Filter by region"
				options={REGIONS}
			/>
		</div>
	);
}
