export interface Country {
	name: {
		common: string;
		official: string;
	};
	capital: string[];
	region: string;
	population: number;
	flags: {
		png: string;
	};
}
