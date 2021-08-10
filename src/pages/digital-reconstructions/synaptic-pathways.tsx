import Head from 'next/head';

import SynapticPathwaysView from '../../views/digitalReconstructions/SynapticPathways';
import MainLayout from '../../layouts/MainLayout';


export default function SynapticPathwaysPage() {
  return (
    <>
      <Head>
        <title>Synaptic pathways / Digital reconstructions / SSCx Portal</title>
        <meta
          name="description"
          content="A synaptic pathway encompasses the set of all possible connections between pairs of neurons of pre and postsynaptic  morphological types (m-types)."
        />
      </Head>

      <MainLayout>
        <SynapticPathwaysView />
      </MainLayout>
    </>
  );
}
