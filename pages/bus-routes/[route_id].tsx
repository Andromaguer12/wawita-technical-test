import Head from 'next/head';
import React from 'react';
import useTranslation from '../../hooks/translation/useTranslation';
import BusRoutePage from '../../components/pages/busroutePage/components/BusRoutePage';
import { useRouter } from 'next/router';

export default function AboutMeView() {
  const { getTitle } = useTranslation();
  const { route_id } = useRouter().query;

  return (
    <>
      <Head>
        <link rel="icon" href="/icolawawita.ico" />
        <title>{getTitle('BUS_ROUTE_PAGE')}</title>
      </Head>
      <BusRoutePage busrouteId={route_id as string} />
    </>
  );
}
