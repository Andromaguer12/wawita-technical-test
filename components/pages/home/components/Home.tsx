import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { Button } from '@mui/material';
import { styles as sxStyles } from '../styles/sxStyles';
import { AirportShuttle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AllRoutes } from '../../../../constants/routes/routes';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const query = useRouter();

  const navigateToSectionInURL = () => {
    const asPath = query.asPath.split('/')[1]
    if(asPath.includes('#')) {
      const element = document.getElementById(asPath.split('#')[1]);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    } 
  }
  

  useEffect(() => {
    setTimeout(() => {
      navigateToSectionInURL()
    }, 5000);
  }, []);

  const goAboutMe = () => {
    router.push(AllRoutes.ALL_BUS_ROUTES)
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.content}>
          <div className={styles.landingTextsContainers}>
            <p className={styles.title}>{t('pages.home.landingText1')}</p>
            <p className={styles.text}>{t('pages.home.landingText2')}</p>
            <p className={styles.note}>{t('pages.home.landingNotes')}</p>
            <div className={styles.landingButtons}>
              <Button
                sx={sxStyles.landingButtons}
                endIcon={<AirportShuttle />}
                color="info"
                variant="outlined"
                onClick={goAboutMe}
              >
                <p className={styles.buttonsTexts}>
                  {t('pages.home.seeRoutes')}
                </p>
              </Button>
            </div>
          </div>
          <div
            className={[
              styles.landingContainers,
              styles.landingPageImageContainer
            ].join(' ')}
          ></div>
        </div>
      </div>
    </>
  );
}
