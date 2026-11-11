import { routes } from '@/router/Router';
import { NavLink } from 'react-router';
import styles from './MainMenu.module.css';
function MainMenu() {
  const routesList = routes[0].children;
  return (
    <div>
      <nav>
        <ul className={styles.container}>
          {routesList.map((route, index) => (
            <li key={index} className={styles.item}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to={route.path}
              >
                {route.meta.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MainMenu;
