import Head from 'next/head';

import LayerAnatomyView from '../../views/experimental/LayerAnatomy';
import MainLayout from '../../layouts/MainLayout';


export default function About() {
  return (
    <>
      <Head>
        <title>Layer anatomy / Experimental data / SSCx Portal</title>
      </Head>

      <MainLayout>
        <LayerAnatomyView />
      </MainLayout>
    </>
  );
}
