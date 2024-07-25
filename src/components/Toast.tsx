import styles from './Toast.module.scss';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isShow: boolean;
  onClose: () => void;
}

const Toast = ({ message, isShow, onClose }: ToastProps) => {
  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isShow, onClose]);

  return (
    <div className={`${styles.toastWrapper} ${isShow ? styles.isShow : ''}`}>
      <div className={styles.toastIconWrapper}>
        <i className={'icon icon-check'} />
      </div>
      <p className={styles.toastText}>{message}</p>
    </div>
  );
};

export default Toast;
