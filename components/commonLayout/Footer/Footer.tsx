import React from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import styles from './styles/Footer.module.scss';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <div className={styles.lines} />
        <div className={styles.delimiter}>
          <p>{t('footer.copyright')}</p>
        </div>
        <div className={styles.lines} />
        <div className={styles.lines} />
        <div className={styles.lines} />
        <div className={styles.lines} />
        <div className={styles.lines} />
        <div className={styles.lines} />
        <div className={styles.lines} />
      </div>
    </div>
  );
}
