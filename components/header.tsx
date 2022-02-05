import Link from "next/link";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import styles from "../styles/components/header.module.scss";

interface PropsInterface {
  theme: string;
  switchTheme: () => void;
};

const Header: React.FC<PropsInterface> = ({ theme, switchTheme }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Where in the world?</Link>
      </div>

      <div className={styles.button} onClick={switchTheme}>
        {theme === "light" ? <RiSunFill /> : <RiMoonFill />}
        <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </header>
  );
}

export default Header;