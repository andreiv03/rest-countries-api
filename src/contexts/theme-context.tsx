"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContext {
	theme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const theme = localStorage.getItem("theme") as Theme | null;
		setTheme(theme ?? "light");
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	}, []);

	const contextValue = useMemo(
		() => ({
			theme,
			toggleTheme,
		}),
		[theme, toggleTheme],
	);

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
