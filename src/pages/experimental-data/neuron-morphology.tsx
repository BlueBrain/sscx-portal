import Head from 'next/head';

import NeuronMorphologyView from '../../views/experimental/NeuronMorphology';
import MainLayout from '../../layouts/MainLayout';


export default function About() {
  return (
    <>
      <Head>
        <title>Neuron morphology / Experimental data / SSCx Portal</title>
        <meta
          name="description"
          content="Neurons comprise complex and highly-branched morphologies of axons and dendrites. Axo-dendritic morphological structure determines the connectivity and biophysical properties of neurons. The 3D geometry of axons and dendrites is reconstructed using specific experimental procedures to classify neurons into diverse morphological types (m-types). Each m-type has several instances of reconstructed axonal and dendritic morphologies. Using a combination of objective classification methods for pyramidal cell types, and subjective classification for interneuron types, we have identified 60 m-types in the primary rat Somatosensory Cortex."
        />
      </Head>

      <MainLayout>
        <NeuronMorphologyView />
      </MainLayout>
    </>
  );
}
