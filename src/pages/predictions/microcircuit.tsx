import Head from 'next/head';

import MicrocircuitView from '../../views/predictions/Microcircuit';
import MainLayout from '../../layouts/MainLayout';


export default function MicrocircuitPage() {
  return (
    <>
      <Head>
        <title>Microcircuit / Predictions / SSCx Portal</title>
        <meta
          name="description"
          content="" // ! todo
        />
      </Head>

      <MainLayout>
        <MicrocircuitView />
      </MainLayout>
    </>
  );
}
