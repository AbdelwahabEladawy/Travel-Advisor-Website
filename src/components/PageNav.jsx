import React from "react";
import styles from "../components/PageNav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
<Logo/>


      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>{" "}
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login"  className={styles.ctaLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
