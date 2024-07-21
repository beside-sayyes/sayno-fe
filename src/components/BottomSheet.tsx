import styles from './BottomSheet.module.scss';

const BottomSheet = () => {
  return (
    <div className={styles.allWrapper}>
      <div className={styles.dimOverlay} />
      <div className={styles.contentWrapper}>
        <div>top</div>
        <div>textarea</div>
        <div>button</div>
      </div>
    </div>
  );
};

export default BottomSheet;
