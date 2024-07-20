import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
