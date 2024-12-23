"use client"
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botão de Hambúrguer */}
      <button className={styles.hamburger} onClick={toggleNavbar}>
        <div className={`${styles.bar} ${isOpen && styles.open}`} />
        <div className={`${styles.bar} ${isOpen && styles.open}`} />
        <div className={`${styles.bar} ${isOpen && styles.open}`} />
      </button>

      {/* Navbar Lateral */}
      <nav className={`${styles.navbar} ${isOpen ? styles.show : ""}`}>
        <ul className={styles.navList}>
          <li>
            <Link href="/about">
              <a className={styles.navLink}>Sobre Nós</a>
            </Link>
          </li>
          <li>
            <Link href="/confession">
              <a className={styles.navLink}>Confissão</a>
            </Link>
          </li>
          <li>
            <Link href="/texts">
              <a className={styles.navLink}>Textos</a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Background Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleNavbar}></div>}
    </div>
  );
};

export default Navbar;
