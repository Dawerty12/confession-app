"use client";
import { useState } from 'react';
import styles from './Navbar.module.css';
import { FaHome, FaBook, FaInfoCircle } from 'react-icons/fa'; // Ícones de exemplo

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={toggleNavbar}>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
      </button>

      {isOpen && <div className={styles.overlay} onClick={toggleNavbar}></div>}

      <nav className={`${styles.navbar} ${isOpen ? styles.show : ''}`}>
        <ul className={styles.navList}>
          <li>
            <a href="/" className={styles.navLink}>
              <FaHome className={styles.icon} /> Home
            </a>
          </li>
          <li>
            <a href="/commandments" className={styles.navLink}>
              <FaBook className={styles.icon} /> Confissão
            </a>
          </li>
          <li>
            <a href="/about" className={styles.navLink}>
              <FaInfoCircle className={styles.icon} /> Sobre Nós
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
