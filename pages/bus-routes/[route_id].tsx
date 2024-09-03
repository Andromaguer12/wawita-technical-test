import Head from 'next/head';
import React from 'react';
import useTranslation from '../../hooks/translation/useTranslation';
import ProjectPage from '../../components/pages/projectPage/components/ProjectPage';
import { useRouter } from 'next/router';

export default function AboutMeView() {
  const { getTitle } = useTranslation();
  const { project_id } = useRouter().query;

  return (
    <>
      <Head>
        <link rel="icon" href="/icolawawita.ico" />
        <title>{getTitle('PROJECTPAGE')}</title>
      </Head>
      <ProjectPage projectId={project_id as string} />
    </>
  );
}
