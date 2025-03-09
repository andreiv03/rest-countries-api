import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import styles from "@/styles/components/select-input.module.scss";

interface Props {
	option: string;
	setOption: (option: string) => void;
	placeholder: string;
	options: string[];
}

const SelectInput: React.FC<Props> = ({ option, setOption, placeholder, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const selectOption = (newOption: string) => {
		setOption(option === newOption ? "" : newOption);
	};

	return (
		<div className={styles["select_input"]} onClick={() => setIsOpen(!isOpen)} ref={selectRef}>
			<button type="button">
				<span>{option ? option : placeholder}</span>
				<RiArrowDropDownLine />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles["options"]}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={{
							initial: { height: 0 },
							animate: { height: "auto", transition: { duration: 0.2, ease: "easeOut" } },
							exit: { height: 0, transition: { duration: 0.2, ease: "easeIn" } },
						}}
					>
						{options.map((option, index) => (
							<div className={styles["option"]} key={index} onClick={() => selectOption(option)}>
								{option}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SelectInput;
