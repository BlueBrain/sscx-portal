import React from 'react';
import Head from 'next/head';

import ContactView from '../views/Contact';
import MainLayout from '../layouts/MainLayout';


export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact / SSCx Portal</title>
        <meta
          name="description"
          content="Let’s stay in touch! For all inquiries, support and collaborations, please email us."
        />
      </Head>

      <MainLayout>
        <ContactView />
      </MainLayout>
    </>
  );
}
