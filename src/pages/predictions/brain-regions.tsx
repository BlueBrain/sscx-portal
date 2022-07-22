import Head from 'next/head';

import BrainRegionsView from '@/views/predictions/BrainRegions';
import MainLayout from '@/layouts/MainLayout';


export default function BrainRegionsPage() {
  return (
    <>
      <Head>
        <title>Brain regions / Predictions / SSCx Portal</title>
        <meta
          name="description"
          content="" // ! todo
        />
      </Head>

      <MainLayout>
        <BrainRegionsView />
      </MainLayout>
    </>
  );
}
