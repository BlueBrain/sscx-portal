import Head from 'next/head';

import BrainRegionsView from '@/views/digitalReconstructions/BrainRegions';
import MainLayout from '@/layouts/MainLayout';


export default function BrainRegionsPage() {
  return (
    <>
      <Head>
        <title>Brain regions / Digital reconstructions / SSCx Portal</title>
        <meta
          name="description"
          content="We digitally reconstructed the non-barrel hind limb primary rat Somatosensory Cortex consisting of eight sub-regions, four million neurons mediated by four billion synapses."
        />
      </Head>

      <MainLayout>
        <BrainRegionsView />
      </MainLayout>
    </>
  );
}
