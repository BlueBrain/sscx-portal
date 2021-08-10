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
          content="Electrical traces were recorded from neurons using whole-cell patch clamp experiments in brain slices. A standardized stimulus protocol, called the e-code, is injected in each cell. Our scientists then classify the cells based on their firing type in different electrical types (e-types)."
        />
      </Head>

      <MainLayout>
        <NeuronElectrophysiologyView />
      </MainLayout>
    </>
  );
}
