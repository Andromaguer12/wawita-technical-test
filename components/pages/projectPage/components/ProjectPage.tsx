/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from '../styles/ProjectPage.module.scss';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { getProjectById, getSimilarProjects } from '../../../../services/redux/reducers/home/bus-routes/actions';
import { Avatar, Skeleton, Typography } from '@mui/material';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { Warning, ZoomIn } from '@mui/icons-material';
import { format } from 'date-fns';
import allTechnologies, {
  technologies
} from '../../../../constants/app/all-technologies';
import Image from 'next/image';
import { AboutMeCardImage } from '../../../../typesDefs/constants/app/about-us/about-us.types';
import ImageZoomer from '../../../commonLayout/ImageZoomer/ImageZoomer';
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params';
import ReactCarousel from '../../../commonLayout/ReactCarousel/ReactCarousel';
import ProjectCard from '../../home/components/ProjectCard';
import SkeletonProjectCard from '../../home/components/SkeletonProjectCard';

interface ProjectPageProps {
  projectId: string;
}

const AutoSwipeableViews: any = autoPlay(SwipeableViews);

const ProjectPage = ({ projectId }: ProjectPageProps) => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();

  const [hoveringImage, setHoveringImage] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string>('')

  const {
    getSpecificProject: {
      loadingSpecificProject,
      projectData,
      errorSpecificProject
    },
    getSimilarProjects: {
      loadingSimilar,
      projectSimilar,
      errorProjectSimilar
    }
  } = useAppSelector(({ projects }) => projects);

  useEffect(() => {
    if (projectId) {
      dispatch(
        getProjectById({
          context: fContext,
          projectId
        })
      );
    }
  }, [projectId]);

  useEffect(() => {
    if(projectData) {
      const payload = {
        technologies: projectData?.technologies && projectData?.technologies.length ? projectData?.technologies : null,
        restrictId: projectId
      }

      dispatch(getSimilarProjects({
        context: fContext,
        filters: convertObjToRequestParams(payload)
      }))
    } 
  }, [projectData, projectId])
  

  const handleOnAutoScroll = (index: number) => {
    setCurrentIndex(index);
  };

  const shadowClick = (image: string) => {
    setZoomImage(image)
  }

  return (
    <>
      <div className={styles.projectPageContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.projectCardImages}>
            {loadingSpecificProject && (
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
              <p className={styles.title}>{t('pages.projectPage.title')}</p>

              <p className={styles.section}>{t('pages.projectPage.section')}</p>
            </div>
            <p className={styles.text}>{t('pages.projectPage.text')}</p>
            {!loadingSpecificProject && !errorSpecificProject && (
              <>
                <AutoSwipeableViews
                  style={{ width: '100%', height: '75%' }}
                  containerStyle={{
                    width: '100%',
                    height: '100%'
                  }}
                  enableMouseEvents
                  onChangeIndex={handleOnAutoScroll}
                >
                  {projectData?.images &&
                    projectData?.images.length > 0 &&
                    projectData?.images.map((image: AboutMeCardImage) => (
                      <div className={styles.carouselSlide} onMouseEnter={() => setHoveringImage(true)} onMouseLeave={() => setHoveringImage(false)} key={image._id}>
                        <img
                          className={styles.image}
                          src={fContext.imageHandler(image.link, '/projects/')}
                          style={{ marginRight: '5px' }}
                          alt={image.name}
                        />
                        {hoveringImage && <div className={styles.zoomShadow} onClick={() => shadowClick(fContext.imageHandler(image.link, '/projects/'))}>
                          <ZoomIn sx={{ color: "#ffffff", fontSize: 50 }} />
                        </div>}
                      </div>
                    ))}
                </AutoSwipeableViews>
                <div className={styles.dots}>
                  {projectData?.images &&
                    projectData?.images.length > 0 &&
                    projectData?.images.map(
                      (image: AboutMeCardImage, index: number) => (
                        <div
                          className={
                            currentIndex === index
                              ? styles.dot__selected
                              : styles.dot
                          }
                          key={image._id}
                        />
                      )
                    )}
                </div>
              </>
            )}
            {errorSpecificProject && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorSpecificProject == 'string'
                    ? errorSpecificProject
                    : 'error'}
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.projectInfoCard}>
            {(loadingSpecificProject || errorSpecificProject) && (
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
                <div className={styles.projectTypes}>
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
            {projectData && (
              <>
                <Typography className={styles.title}>
                  {projectData?.title}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  {t('pages.projectPage.projectInfo')}
                </Typography>
                <Typography className={styles.subtitles2}>
                  {t('pages.projectPage.participation')}
                </Typography>
                <div className={styles.ownerCard}>
                  <Avatar
                    src={fContext.imageHandler(
                      projectData.owner?.image,
                      '/user-images/'
                    )}
                    style={{ background: '#8b6e0b', width: 50, height: 50 }}
                  >
                    {projectData.owner?.name[0]}
                  </Avatar>
                  <div className={styles.ownerInfo}>
                    <Typography className={styles.name}>
                      {projectData.owner?.name}
                    </Typography>
                    <div className={styles.header}>
                      <div className={styles.card}>
                        <Typography>Developer</Typography>
                      </div>
                      <div className={styles.subheader}>
                        {projectData.aproxDate
                          ? format(
                              new Date(projectData.aproxDate),
                              'dd/MM/yyyy'
                            )
                          : 'dd/MM/yyyy'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.projectPage.description')}
                </Typography>
                <div className={styles.descriptionContainer}>
                  <Typography className={styles.description}>
                    {t(projectData?.description ?? 'No description')}
                  </Typography>
                </div>
                <Typography className={styles.subtitles2}>
                  {t('pages.projectPage.classification')}
                </Typography>
                <div className={styles.projectTypes}>
                  {projectData.projectType?.map((type, index) => {
                    return (
                      <div
                        className={styles.card}
                        key={index}
                        color="text.secondary"
                      >
                        <Typography>
                          {t('pages.home.cards.projectTypes.' + type)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.projectPage.technologies')}
                </Typography>
                <div className={styles.usedTechnologies}>
                  {projectData?.technologies &&
                  projectData?.technologies.length > 0 ? (
                    <>
                      {projectData.technologies?.map((tech, index) => {
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
              </>
            )}
          </div>
        </div>
      </div>
      <ImageZoomer 
        open={Boolean(zoomImage)}
        image={zoomImage}
        close={() => setZoomImage('')}
      />
      {(loadingSimilar || errorProjectSimilar || projectSimilar.length > 0) && <div className={styles.parentContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.mixedProjectsContainer}>
            <div className={styles.sectionTitle}>
              <p className={styles.title}>
                {t('pages.projectPage.otherProjectsTitle')}
              </p>

              <p className={styles.section}>
                {t('pages.home.aboutUs.projects.section')}
              </p>
            </div>
            <p className={styles.text}>{t('pages.projectPage.otherProjectsText')}</p>
            <ReactCarousel
              data={projectSimilar}
              componentToRender={ProjectCard}
              skeletonComponentToRender={SkeletonProjectCard}
              loading={loadingSimilar}
              error={errorProjectSimilar}
            />
          </div>
        </div>
      </div>}
    </>
  );
};

export default ProjectPage;
