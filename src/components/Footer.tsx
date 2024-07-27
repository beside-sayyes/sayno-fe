import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src='images/logo_sayno_gray.png' alt='sayno logo' />
      </div>
      <a className={styles.text} href='mailto:just.sayno.cs@gmail.com'>
        문의: just.sayno.cs@gmail.com
      </a>
      <p className={styles.text}>©SAYNO. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
