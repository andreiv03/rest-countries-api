export interface Country {
	capital: string[];
	flags: {
		png: string;
	};
	name: {
		common: string;
		official: string;
	};
	population: number;
	region: string;
}
