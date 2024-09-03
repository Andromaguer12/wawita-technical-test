import React from 'react';
import AllProjectsPage from '../../components/pages/allProjectsPage/components/AllBusRoutesPage';
import Head from 'next/head';
import useTranslation from '../../hooks/translation/useTranslation';

export default function AboutMeView() {
  const { getTitle } = useTranslation();

  return <>
    <Head>
      <link rel="icon" href="/icolawawita.ico" />
      <title>{getTitle('ALL_BUS_ROUTES')}</title>
    </Head>
    <AllProjectsPage />
  </>
}
