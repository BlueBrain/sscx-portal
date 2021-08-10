import Head from 'next/head';

import NeuronsView from '../../views/digitalReconstructions/Neurons';
import MainLayout from '../../layouts/MainLayout';


export default function NeuronsPage() {
  return (
    <>
      <Head>
        <title>Neurons / Digital reconstructions / SSCx Portal</title>
      </Head>

      <MainLayout>
        <NeuronsView />
      </MainLayout>
    </>
  );
};
