import React from 'react';
import Head from 'next/head';

import GlossaryView from '../views/Glossary';
import MainLayout from '../layouts/MainLayout';


export default function Glossary() {
  return (
    <>
      <Head>
        <title>Glossary / SSCx Portal</title>
      </Head>

      <MainLayout>
        <GlossaryView />
      </MainLayout>
    </>
  );
}
