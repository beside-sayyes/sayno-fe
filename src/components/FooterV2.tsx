import styles from './Footer.module.scss';

const Footer = ({ isV2 = true }) => {
  return (
    <footer className={`${styles.footer} ${isV2 ? styles.typeV2 : ''}`}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src='images/logo_sayno_gray.png' alt='sayno logo' />
      </div>
      <a className={styles.text} href='mailto:cs.just.sayno@gmail.com'>
        문의: cs.just.sayno@gmail.com
      </a>
      <p className={styles.text}>©SAYNO. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
