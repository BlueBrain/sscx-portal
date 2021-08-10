import React from 'react';
import Head from 'next/head';

import ContactView from '../views/Contact';
import MainLayout from '../layouts/MainLayout';


export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact / SSCx Portal</title>
      </Head>

      <MainLayout>
        <ContactView />
      </MainLayout>
    </>
  );
}
