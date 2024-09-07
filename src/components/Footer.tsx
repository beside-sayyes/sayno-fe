import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src='images/logo_sayno_gray.png' alt='sayno logo' />
      </div>
      <a className={styles.text} href='mailto:help.justsayno@gmail.com'>
        문의: help.justsayno@gmail.com
      </a>
      <p className={styles.text}>©SAYNO. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
