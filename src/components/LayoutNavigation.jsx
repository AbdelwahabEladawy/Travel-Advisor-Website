import React from "react";
// import styles from "../components/LayoutNavigation.module.css"
import styles from "./LayoutNavigation.module.css";
import { NavLink } from "react-router-dom";

export default function LayoutNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
