import Head from 'next/head';

import NeuronMorphologyView from '../../views/experimental/NeuronMorphology';
import MainLayout from '../../layouts/MainLayout';


export default function About() {
  return (
    <>
      <Head>
        <title>Neuron morphology / Experimental data / SSCx Portal</title>
      </Head>

      <MainLayout>
        <NeuronMorphologyView />
      </MainLayout>
    </>
  );
}
