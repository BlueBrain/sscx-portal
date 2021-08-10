import Head from 'next/head';

import LayerAnatomyView from '../../views/experimental/LayerAnatomy';
import MainLayout from '../../layouts/MainLayout';


export default function About() {
  return (
    <>
      <Head>
        <title>Layer anatomy / Experimental data / SSCx Portal</title>
        <meta
          name="description"
          content="The Somatosensory Cortex has a laminar structure where neurons are organized across six distinct layers."
        />
      </Head>

      <MainLayout>
        <LayerAnatomyView />
      </MainLayout>
    </>
  );
}
