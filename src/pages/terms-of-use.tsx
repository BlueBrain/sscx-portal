import React from 'react';
import Head from 'next/head';

import TosView from '../views/Tos';
import MainLayout from '../layouts/MainLayout';


export default function TermsOfUse() {
  return (
    <>
      <Head>
        <title>Terms of use / SSCx Portal</title>
      </Head>

      <MainLayout>
        <TosView />
      </MainLayout>
    </>
  );
};
