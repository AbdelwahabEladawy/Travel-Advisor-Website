import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
import LayoutNavigation from "./LayoutNavigation";
// import AppNav from "./AppNav";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      {/* <AppNav /> */}
      <LayoutNavigation/>
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copyright {new Date().getFullYear()} By World Wide inc
        </p>
      </footer>
    </div>
  );
}
