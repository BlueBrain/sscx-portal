import Head from 'next/head';

import HomeView from '../views/Home';
import MainLayout from '../layouts/MainLayout';


export default function Home() {
  return (
    <>
    <Head>
        <title>Home / SSCx Portal</title>
        <meta
          name="description"
          content="The SSCx portal is a freely accessible resource, which provides access to the Blue Brain Project's experimental data sets on the multi-scale organization of the juvenile rat primary somatosensory cortex - sub-regions, microcircuits, neurons, synapses, and the resulting computational models."
        />
      </Head>

      <MainLayout>
        <HomeView />
      </MainLayout>
    </>
  );
}
