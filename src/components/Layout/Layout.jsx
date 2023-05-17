import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from "./Layout.module.css";

const Layout = () => {
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

      <main className={css.mainWrapper}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer></footer>
    </>
  );
};

export default Layout;
