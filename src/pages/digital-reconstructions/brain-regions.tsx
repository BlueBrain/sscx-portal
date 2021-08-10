import Head from 'next/head';

import BrainRegionsView from '../../views/digitalReconstructions/BrainRegions';
import MainLayout from '../../layouts/MainLayout';


export default function BrainRegionsPage() {
  return (
    <>
      <Head>
        <title>Brain regions / Digital reconstructions / SSCx Portal</title>
      </Head>

      <MainLayout>
        <BrainRegionsView />
      </MainLayout>
    </>
  );
}
