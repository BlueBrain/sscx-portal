import Head from 'next/head';

import SynapticPathwaysView from '../../views/digitalReconstructions/SynapticPathways';
import MainLayout from '../../layouts/MainLayout';


export default function SynapticPathwaysPage() {
  return (
    <>
      <Head>
        <title>Synaptic pathways / Digital reconstructions / SSCx Portal</title>
      </Head>

      <MainLayout>
        <SynapticPathwaysView />
      </MainLayout>
    </>
  );
}
