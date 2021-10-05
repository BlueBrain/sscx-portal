import React from 'react';
import Head from 'next/head';

import NwbTutorialView from '../../views/tutorials/Nwb';
import MainLayout from '../../layouts/MainLayout';


export default function Glossary() {
  return (
    <>
      <Head>
        <title>Tutorials - How to read NWB files / SSCx Portal</title>
        <meta
          name="description"
          content="How to read NWB files tutorial."
        />
      </Head>

      <MainLayout>
        <NwbTutorialView />
      </MainLayout>
    </>
  );
}
