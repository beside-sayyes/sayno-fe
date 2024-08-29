import styles from './BottomSheet.module.scss';
import PrimaryButton from './PrimaryButton.tsx';
import { Fragment, useState } from 'react';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';

interface BottomSheetProps {
  isShow: boolean;
  bottomSheetTitle: string;
  onClose: () => void;
  onClick: () => void;
  isV2?: boolean;
}

const BottomSheet = ({ isShow, onClose, onClick, bottomSheetTitle, isV2 = true }: BottomSheetProps) => {
  const [selectedOptions, setSelectedOptions] = useState({
    style: RADIO_OPTIONS_V2.STYLE_OPTIONS[0],
    polite: RADIO_OPTIONS_V2.POLITE_OPTIONS[0],
  });

  const handleOptionChange = (type: 'style' | 'polite', value: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [type]: value,
    }));
  };

  return (
    <div className={`${styles.allWrapper} ${isV2 ? styles.typeV2 : ''} ${isShow ? styles['is-show'] : null}`}>
      <div className={styles.dimOverlay} />
      <div className={`${styles.contentWrapper} ${isShow ? styles['is-show'] : null}`}>
        <div className={styles.topWrapper}>
          <div>
            <h2 className={styles.bottomSheetTitle}>{bottomSheetTitle}</h2>
          </div>
          <button className={`default-input ${styles.Button}`} onClick={onClose} aria-label={'닫기'}>
            <div className={styles.closeIconWrapper}>
              <i className={'icon icon-close'} />
            </div>
          </button>
        </div>
        <div className={styles.subTextAllWrapper}>
          <div className={styles.subTextWrapper}>
            <p className={styles.subText}>화법</p>
          </div>
          <div className={styles.customNormalWrapper}>
            {RADIO_OPTIONS_V2.STYLE_OPTIONS.map((option, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={`${styles.customLabelWrapper} ${selectedOptions.style === option ? styles['is-selected'] : null}`}
                  >
                    <label className={styles.label}>
                      <input
                        type='radio'
                        name='style'
                        value={option}
                        checked={selectedOptions.style === option}
                        style={{ display: 'none' }}
                        onChange={() => {
                          handleOptionChange('style', option);
                        }}
                      />
                      <span className={styles.labelText}>{option}</span>
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className={styles.subTextAllWrapper}>
          <div className={styles.subTextWrapper}>
            <p className={styles.subText}>존댓말 여부</p>
          </div>
          <div className={styles.customNormalWrapper}>
            {RADIO_OPTIONS_V2.POLITE_OPTIONS.map((option, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={`${styles.customLabelWrapper} ${selectedOptions.polite === option ? styles['is-selected'] : null}`}
                  >
                    <label className={styles.label}>
                      <input
                        type='radio'
                        name='polite'
                        value={option}
                        checked={selectedOptions.polite === option}
                        style={{ display: 'none' }}
                        onChange={() => {
                          handleOptionChange('polite', option);
                        }}
                      />
                      <span className={styles.labelText}>{option}</span>
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        <PrimaryButton buttonText={'멘트 재요청'} onClick={onClick} disabled={false} />
      </div>
    </div>
  );
};

export default BottomSheet;
