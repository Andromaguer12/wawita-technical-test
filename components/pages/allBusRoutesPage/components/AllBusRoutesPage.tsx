import React, { useEffect, useRef } from 'react'
import styles from '../styles/AllBusRoutesPage.module.scss'
import { getAllBusRoutes, getAllBusRoutesPhotos } from '../../../../services/redux/reducers/home/bus-routes/actions';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { Warning } from '@mui/icons-material';
import AllBusRoutesCard from './AllBusRoutesCard';
import { Typography } from '@mui/material';

const AllBusRoutesPage = () => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();
  const resultsRef: React.RefObject<HTMLDivElement> = useRef(null)
 
  const { loading, data, error } = useAppSelector(({ busroutes }) => busroutes);


  useEffect(() => {
    dispatch(getAllBusRoutes({ context: fContext }))
    dispatch(getAllBusRoutesPhotos({ context: fContext }))
  }, [])  

  return (
    <>
      
      <div className={styles.parentContainer}>
      <div className={styles.maxContainer}>
          <div className={styles.mixedProjectsContainer}>
            <div className={styles.sectionTitle} ref={resultsRef}>
              <p className={styles.title}>
                {t('pages.busroutes.results')}
              </p>
            </div>
            {loading && (
              <div className={styles.cardsContainer}>
                {Array(15).fill({}).map((_obj, index) => {
                  return <AllBusRoutesCard key={index} skeletonMode />
                })}
              </div>
            )}

            {!loading && data.length > 0 && (
              <div className={styles.cardsContainer}>
                {data.map((card) => {
                  return <AllBusRoutesCard key={card._id} card={card} />
                })}
              </div>
            )}

            {!loading && data.length === 0 && (
              <div className={styles.error}>
              <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
              <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                {t('noData')}
              </Typography>
            </div>
            )}

            {error && <div className={styles.error}>
              <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
              <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                {typeof error == 'string'
                  ? error
                  : 'error'}
              </Typography>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AllBusRoutesPage