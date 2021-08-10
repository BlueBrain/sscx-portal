import Head from 'next/head';

import MicrocircuitView from '../../views/digitalReconstructions/Microcircuit';
import MainLayout from '../../layouts/MainLayout';


export default function MicrocircuitPage() {
  return (
    <>
      <Head>
        <title>Microcircuit / Digital reconstructions / SSCx Portal</title>
        <meta
          name="description"
          content="A neuronal microcircuit is the smallest functional ecosystem in any brain region that encompasses a diverse morphological and electrical assortment of neurons, and their synaptic interactions."
        />
      </Head>

      <MainLayout>
        <MicrocircuitView />
      </MainLayout>
    </>
  );
}
