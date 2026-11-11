import { Outlet } from 'react-router';
import MainMenu from './components/MainMenu';
import styles from './MainLayout.module.css';

function MainLayout() {
  return (
    <div className={styles.layout}>
      <MainMenu />
      <Outlet />
    </div>
  );
}

export default MainLayout;
