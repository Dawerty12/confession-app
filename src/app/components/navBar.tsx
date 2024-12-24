"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaHome, FaBook, FaInfoCircle } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão de hambúrguer */}
      <button className={styles.hamburger} onClick={toggleNavbar}>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
      </button>

      {/* Overlay escuro quando o menu está aberto */}
      {isOpen && <div className={styles.overlay} onClick={toggleNavbar}></div>}

      {/* Navbar lateral */}
      <nav className={`${styles.navbar} ${isOpen ? styles.show : ''}`}>
        <ul className={styles.navList}>
          {/* Primeiro item com estilo exclusivo */}
          <li>
            <Link href="/" className={styles.navLink}>
              <FaHome className={styles.icon} /> Home
            </Link>
          </li>
          {/* Confissão */}
          <li>
            <Link href="/commandments" className={styles.navLink}>
              <FaBook className={styles.icon} /> Confissão
            </Link>
          </li>
          {/* Sobre Nós */}
          <li>
            <Link href="/about" className={styles.navLink}>
              <FaInfoCircle className={styles.icon} /> Sobre Nós
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
