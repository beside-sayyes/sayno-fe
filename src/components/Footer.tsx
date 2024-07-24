import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src='images/logo_sayno_gray.png' alt='sayno logo' />
      </div>
      <a className={styles.text} href='mailto:sayno.cs@gmail.com'>
        문의: sayno.cs@gmail.com
      </a>
      <p className={styles.text}>©SAYNO. All rights reserved.</p>
    </div>
  );
};

export default Footer;
