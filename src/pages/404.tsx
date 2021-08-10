import React from 'react';
import Head from 'next/head';

import MainLayout from '../layouts/MainLayout';


export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found / SSCx Portal</title>
      </Head>

      <MainLayout>
        <div className="text-center" style={{ marginTop: '32vh', marginBottom: '12vh' }}>
          <h3 className="text-white">404 | Page Not Found</h3>
        </div>
      </MainLayout>
    </>
  );
};
