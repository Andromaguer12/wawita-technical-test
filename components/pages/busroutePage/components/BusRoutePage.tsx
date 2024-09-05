/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import styles from '../styles/BusRoutePage.module.scss';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { Skeleton, Typography } from '@mui/material';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { getBusRouteById } from '../../../../services/redux/reducers/home/bus-routes/actions';
import { AirportShuttle } from '@mui/icons-material';
import { format } from 'date-fns';
import { formatCurrency } from '../../../../utils/helpers/format-currency';
import MapWithRoute from '../../../commonLayout/MapWithRoute/MapWithRoute';

interface BusRoutePageProps {
  busrouteId: string;
}

const BusRoutePage = ({ busrouteId }: BusRoutePageProps) => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();

  const {
    getSpecificBusRoute: {
      loadingSpecificBusRoute,
      busrouteData,
      errorSpecificBusRoute
    },
  } = useAppSelector(({ busroutes }) => busroutes);

  useEffect(() => {
    if (busrouteId) {
      dispatch(
        getBusRouteById({
          context: fContext,
          busrouteId
        })
      );
    }
  }, [busrouteId]);
  
  return (
    <>
      <div className={styles.busroutePageContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.busrouteCardImages}>
            {loadingSpecificBusRoute && (
              <>
                <div className={styles.sectionTitle}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem' }}
                    width={'200px'}
                  />

                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                    width={'120px'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'50%'}
                />
                <Skeleton variant="text" width={'100%'} height={'100%'} />
              </>
            )}
            <div className={styles.sectionTitle}>
              <p className={styles.title}>{t('pages.busroutePage.map')}</p>
            </div>
              <div className={styles.mapContainer}>
                {busrouteData?.initialPoint && busrouteData.finalPoint && <MapWithRoute initialPoint={JSON.parse(busrouteData?.initialPoint)} finalPoint={JSON.parse(busrouteData.finalPoint)} />}
              </div>
          </div>
          <div className={styles.busrouteInfoCard}>
            {(loadingSpecificBusRoute || errorSpecificBusRoute) && (
              <>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '2rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '30px' }}
                  width={80}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.ownerCard}>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    className={styles.avatar}
                  />
                  <div className={styles.ownerInfo}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80%'}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80px'}
                    />
                  </div>
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.descriptionContainer}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'50%'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={120}
                />
                <div className={styles.busrouteTypes}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '0px' }}
                  width={80}
                />
                <div className={styles.usedTechnologies}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
              </>
            )}
            {busrouteData && (
              <>
                <Typography className={styles.title}>
                  {busrouteData?.origin} - {busrouteData?.destiny}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  {t('pages.busroutePage.busrouteInfo')}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  <AirportShuttle />
                  {busrouteData?.buses?.length ? `${busrouteData.buses[0].model} - ${busrouteData.buses[0].plate} - cap: ${busrouteData.buses[0].capacity}` : t('notBusesAssigned')}
                </Typography>
                <Typography className={styles.subtitles2}>
                  {t('pages.busroutePage.schedule')}
                </Typography>
                <div className={styles.times}>
                <div className={styles.card}>
                  <Typography>{t('startTime')}:</Typography>
                </div>
                <Typography className={styles.subtitles} style={{ marginBottom: 0 }}>
                  {busrouteData?.startTime
                    ? format(
                        new Date(busrouteData?.startTime),
                        'dd/MM/yyyy hh:mm aa'
                      )
                    : 'dd/MM/yyyy'}
                </Typography>
                </div>
                <div className={styles.times}>
                <div className={styles.card}>
                  <Typography>{t('arriveTime')}:</Typography>
                </div>
                <Typography className={styles.subtitles} style={{ marginBottom: 0 }}>
                  {busrouteData?.arriveTime
                    ? format(
                        new Date(busrouteData?.arriveTime),
                        'dd/MM/yyyy hh:mm aa'
                      )
                    : 'dd/MM/yyyy'}
                </Typography>
                </div>
                <Typography className={styles.subtitles2}>
                  {t('price')}
                </Typography>
                <Typography className={styles.price}>
                  {formatCurrency(busrouteData?.price ?? 0)}
                </Typography>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusRoutePage;
