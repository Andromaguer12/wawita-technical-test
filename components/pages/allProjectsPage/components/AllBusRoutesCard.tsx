import React, { useState } from 'react'
import styles from '../styles/AllBusRoutesCard.module.scss'
import { Avatar, Collapse, IconButton, Skeleton, Typography } from '@mui/material'
import useFetchingContext from '../../../../contexts/backendConection/hook'
import { useStyles } from '../../home/styles/sxProjectCardStyles';
import useTranslation from '../../../../hooks/translation/useTranslation'
import Image from 'next/image'
import ShareIcon from '@mui/icons-material/Share';
import { ArrowDropDown, OpenInBrowser, ZoomIn } from '@mui/icons-material'
import { AllRoutes } from '../../../../constants/routes/routes'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import ImageZoomer from '../../../commonLayout/ImageZoomer/ImageZoomer'

interface AllBusRoutesCardProps {
  card?: any,
  skeletonMode?: boolean
}

const AllBusRoutesCard = ({ card, skeletonMode }: AllBusRoutesCardProps) => {
  const { t } = useTranslation();
  const fContext = useFetchingContext();
  const router = useRouter();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)
  const [hoveringImage, setHoveringImage] = useState<boolean>(false)
  const [zoomImage, setZoomImage] = useState<string>('')

  const handleViewMore = () => {
    router.push(AllRoutes.BUS_ROUTE.replace(":id", card?._id));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card?.title + t('share.project.title'),
          text: t('share.project.text'),
          url: AllRoutes.BUS_ROUTE.replace(":id", card?._id)
        });
      } catch (error) {
        console.error('error in share', error);
      }
    } else {
      console.log('cant share...');
    }
  };

  const handleGoToLink = () => {
    if (typeof window !== 'undefined') {
      window.open(card?.link);
    }
  }

  const shadowClick = (image: string) => {
    setZoomImage(image)
  }

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
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <>
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
                </>
              </Collapse>
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

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.imageContainer} onMouseEnter={() => setHoveringImage(true)} onMouseLeave={() => setHoveringImage(false)}>
          <img
            className={styles.image}
            src={fContext.imageHandler(card?.images && card.images.length > 0 ? card.images[0].link : '', '/projects/')}
            alt={card?.title+'-image-card'}
          />
          {hoveringImage && (
            <div className={styles.zoomShadow} onClick={() => shadowClick(fContext.imageHandler(card?.images && card.images.length > 0 ? card.images[0].link : '', '/projects/'))}>
              <ZoomIn sx={{ color: "#ffffff", fontSize: 50 }} />
            </div>
          )}
        </div>
        <div className={styles.text}>
          <Typography
            className={classes.title2}
            fontWeight={'bold'}
            color="text.secondary"
          >
            {card?.title}
          </Typography>
          <Typography className={classes.devTime} color="text.secondary">
            <b>Dev Time:</b>{' '}
            {t(projectDevTimes[card?.devTime as keyof typeof projectDevTimes])}
          </Typography>
          <div className={classes.projectTypes}>
            {card?.projectType?.map((type, index) => {
              return (
                <Typography
                  className={classes.card}
                  key={index}
                  color="text.secondary"
                >
                  {t('pages.home.cards.projectTypes.' + type)}
                </Typography>
              );
            })}
          </div>
          <div className={styles.usedTechnologies}>
            {card?.technologies &&
            card?.technologies.length > 0 ? (
              <>
                {card.technologies?.map((tech, index) => {
                  return (
                    <div
                      className={styles.card}
                      key={index}
                      color="text.secondary"
                    >
                      <Image
                        className={styles.image}
                        src={
                          allTechnologies[
                            technologies.find((t) => t.name === tech)
                              ?.image as keyof typeof allTechnologies
                          ]
                        }
                        width={20}
                        height={20}
                        style={{ marginRight: '5px' }}
                        alt={
                          technologies.find((t) => t.name === tech)
                            ?.name ?? ''
                        }
                      />
                      <Typography>
                        {technologies.find((t) => t.name === tech)?.name}
                      </Typography>
                    </div>
                  );
                })}
              </>
            ) : (
              <Typography className={styles.error}>
                {t('No technologies')}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.textAndInfoContainer}>
        <div className={styles.ownerCard}>
          <Avatar
            src={fContext.imageHandler(
              card?.owner?.image,
              '/user-images/'
            )}
            style={{ background: '#8b6e0b', width: 20, height: 20 }}
          >
            {card?.owner?.name[0]}
          </Avatar>
          <div className={styles.ownerInfo}>
            <Typography className={styles.name}>
              {card?.owner?.name}
            </Typography>
            <div className={styles.header}>
              <div className={styles.card}>
                <Typography>Developer</Typography>
              </div>
              <div className={styles.subheader}>
                {card?.aproxDate
                  ? format(
                      new Date(card?.aproxDate),
                      'dd/MM/yyyy'
                    )
                  : 'dd/MM/yyyy'}
              </div>
            </div>
          </div>
          <IconButton onClick={() => setExpanded(!expanded)} size='small' sx={{ marginLeft: 'auto'}}>
            <ArrowDropDown sx={{ transition: 'all ease 500ms', transform: `rotateZ(${!expanded ? '0deg': '180deg'})`}} />
          </IconButton>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <>
            <Typography className={styles.subtitles2}>
              {t('pages.projectPage.description')}
            </Typography>
            <div className={styles.headerDescriptionResponsive}>
              <div className={styles.card}>
                <Typography>Developer</Typography>
              </div>
              <div className={styles.subheader}>
                {card?.aproxDate
                  ? format(
                      new Date(card?.aproxDate),
                      'dd/MM/yyyy'
                    )
                  : 'dd/MM/yyyy'}
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <Typography className={styles.description}>
                {t(card?.description ?? 'No description')}
              </Typography>
            </div>
          </>
        </Collapse>
      </div>
      <div className={styles.divider} />
      <div className={styles.buttons}>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
        {card?.link && <IconButton aria-label="share" onClick={handleGoToLink}>
          <OpenInBrowser />
        </IconButton>}
        <div className={styles.genericButton} onClick={handleViewMore}>
          {t('pages.home.viewMore')}
        </div>
      </div>
      <ImageZoomer 
        open={Boolean(zoomImage)}
        image={zoomImage}
        close={() => setZoomImage('')}
      />
    </div>
  )
}

export default AllBusRoutesCard