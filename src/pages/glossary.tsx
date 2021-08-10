import React from 'react';
import Head from 'next/head';

import GlossaryView from '../views/Glossary';
import MainLayout from '../layouts/MainLayout';


export default function Glossary() {
  return (
    <>
      <Head>
        <title>Glossary / SSCx Portal</title>
        <meta
          name="description"
          content="Terms used in the SSCx portal."
        />
      </Head>

      <MainLayout>
        <GlossaryView />
      </MainLayout>
    </>
  );
}
