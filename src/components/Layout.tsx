import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        <div className={styles.page}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
