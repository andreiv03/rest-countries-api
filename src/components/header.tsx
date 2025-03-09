"use client";

import Link from "next/link";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import { ThemeContext } from "@/contexts/theme-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/header.module.scss";

export default function Header() {
	const { theme, toggleTheme } = useContextHook(ThemeContext);

	return (
		<header className={styles["header"]}>
			<div className={styles["logo"]}>
				<Link href="/">Where in the world?</Link>
			</div>

			<button onClick={toggleTheme} type="button">
				{theme === "light" ? <RiSunFill /> : <RiMoonFill />}
				<span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
			</button>
		</header>
	);
}
