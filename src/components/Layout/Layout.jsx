// import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <ul className={css.headerList}>
          <li>
            <NavLink to="/" className={css.navLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={css.navLink}>Movies</NavLink>
          </li>
        </ul>
      </header>

      <main>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Outlet />
        {/* </Suspense> */}
      </main>

      <footer></footer>
    </>
  );
};
