import Head from 'next/head';

import NeuronElectrophysiologyView from '../../views/experimental/NeuronElectrophysiology';
import MainLayout from '../../layouts/MainLayout';


export default function NeuronElectrophysiologyPage() {
  return (
    <>
      <Head>
        <title>Neuron electrophysiology / Experimental data / SSCx Portal</title>
      </Head>

      <MainLayout>
        <NeuronElectrophysiologyView />
      </MainLayout>
    </>
  );
}
