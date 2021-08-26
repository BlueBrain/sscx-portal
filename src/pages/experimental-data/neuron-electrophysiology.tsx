import Head from 'next/head';

import NeuronElectrophysiologyView from '../../views/experimental/NeuronElectrophysiology';
import MainLayout from '../../layouts/MainLayout';


export default function NeuronElectrophysiologyPage() {
  return (
    <>
      <Head>
        <title>Neuron electrophysiology / Experimental data / SSCx Portal</title>
        <meta
          name="description"
          content="The electrophysiological properties of neurons are characterized using whole-cell patch clamp experiments in brain slices. A standardized battery of stimuli, called the e-code, is applied to each neuron and their response is classified into different electrical types (e-types)."
        />
      </Head>

      <MainLayout>
        <NeuronElectrophysiologyView />
      </MainLayout>
    </>
  );
}
