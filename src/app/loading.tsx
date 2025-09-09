"use client";

import { useState, useEffect } from "react";

import styles from "@/styles/components/loading.module.scss";

export default function Loading() {
	const [skeletonCount, setSkeletonCount] = useState(0);

	useEffect(() => {
		const updateSkeletonCount = () => {
			const PADDING = 64;
			const CONTAINER_WIDTH = window.innerWidth - PADDING;
			const CARD_WIDTH = 250;
			const GAP = 32;

			const columns = Math.floor(CONTAINER_WIDTH / (CARD_WIDTH + GAP));
			const rows = Math.ceil(window.innerHeight / 250) - 1;
			setSkeletonCount(columns * rows);
		};

		updateSkeletonCount();
		window.addEventListener("resize", updateSkeletonCount);
		return () => {
			window.removeEventListener("resize", updateSkeletonCount);
		};
	}, []);

	return (
		<div className={styles["skeleton_container"]}>
			{Array.from({ length: skeletonCount }).map((_, index) => (
				<div className={styles["skeleton_card"]} key={index}>
					<div className={styles["skeleton_image"]} />
					<div className={styles["skeleton_title"]} />
					<div className={styles["skeleton_text"]} />
					<div className={styles["skeleton_text"]} />
					<div className={styles["skeleton_text"]} />
				</div>
			))}
		</div>
	);
}
