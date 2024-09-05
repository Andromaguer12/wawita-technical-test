import React, { useEffect, useState } from 'react'
import styles from '../styles/AllBusRoutesCard.module.scss'
import { Skeleton, Typography } from '@mui/material'
import { useStyles } from '../../home/styles/sxProjectCardStyles';
import useTranslation from '../../../../hooks/translation/useTranslation'
import { format } from 'date-fns'
import { BusRoute } from '../../../../types/routes';
import { AirportShuttle } from '@mui/icons-material';
import { formatCurrency } from '../../../../utils/helpers/format-currency';
import { AllRoutes } from '../../../../constants/routes/routes';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../../services/redux/store';
import { Bus } from '../../../../types/buses';

interface AllBusRoutesCardProps {
  card?: BusRoute,
  skeletonMode?: boolean
}

const AllBusRoutesCard = ({ card, skeletonMode }: AllBusRoutesCardProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const [currentBus, setcurrentBus] = useState<Bus | null>(null)

  const { 
    getBuses: { data }
  } = useAppSelector((d) => d.busroutes)

  if(skeletonMode) {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <div className={styles.imageContainer}>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={'100%'}
            />
          </div>
          <div className={styles.text}>
            <Skeleton
              variant="text"
              sx={{ fontSize: '2rem' }}
              width={'100%'}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              width={'20%'}
            />
            <div className={classes.projectTypes}>
              {Array(5).fill({})?.map((_type, index) => {
                return (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '5px' }}
                    width={40}
                    key={index}
                  />
                );
              })}
            </div>
            <div className={styles.usedTechnologies}>
              {Array(7).fill({})?.map((_type, index) => {
                return (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '5px' }}
                    width={40}
                    key={index}
                  />
                );
              })}
            </div>
            </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.textAndInfoContainer}>
              <div className={styles.ownerCard}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  className={styles.avatar}
                />
                <div className={styles.ownerInfo}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.5rem', marginRight: '5px' }}
                    width={150}
                  />
                  <div className={styles.header}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '2rem', marginRight: '5px' }}
                      width={40}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1.5rem' }}
                      width={'80px'}
                    />
                  </div>
                </div>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  className={styles.avatar}
                  sx={{ fontSize: '2rem', marginLeft: 'auto' }}
                />
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.buttons}>
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                sx={{marginRight: '5px'}}
                className={styles.avatar}
              />
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                className={styles.avatar}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: '2.7rem', marginLeft: 'auto' }}
                width={80}
              />
            </div>
          </div>
    )
  }

  const handleNavigate =  () => {
    router.push(AllRoutes.BUS_ROUTE.replace(":id", card?.id ?? ""));
  }

  const getBus = () => {
    const  bus = data.find(d => d.routeId == card?.id)
    if(bus) setcurrentBus(bus)
    return bus
  }

  useEffect(() => {
    getBus();
  }, [])

  return (
    <div className={styles.cardContainer} onClick={handleNavigate}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
        </div>
        <div className={styles.text}>
          <Typography
            className={classes.title2}
            fontWeight={'bold'}
            color="text.secondary"
          >
            {card?.origin} - {card?.destiny}
          </Typography>
         
              <div className={styles.card}>
                <Typography>{t('startTime')}:</Typography>
              </div>
              <Typography className={styles.subheader}>
                {card?.startTime
                  ? format(
                      new Date(card?.startTime),
                      'dd/MM/yyyy hh:mm aa'
                    )
                  : 'dd/MM/yyyy'}
              </Typography>
              <div className={styles.card}>
                <Typography>{t('arriveTime')}:</Typography>
              </div>
              <Typography className={styles.subheader}>
                {card?.arriveTime
                  ? format(
                      new Date(card?.arriveTime),
                      'dd/MM/yyyy hh:mm aa'
                    )
                  : 'dd/MM/yyyy'}
              </Typography>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.textAndInfoContainer}>
        <div className={styles.data}>
          <Typography className={styles.bus}>
            <AirportShuttle />
            {currentBus ? t('1bustaking') : t('notBusesAssigned')}
          </Typography>
          <Typography className={styles.price}>
            {formatCurrency(card?.price as number)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default AllBusRoutesCard