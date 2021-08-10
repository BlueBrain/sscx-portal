import Head from 'next/head';

import MicrocircuitView from '../../views/digitalReconstructions/Microcircuit';
import MainLayout from '../../layouts/MainLayout';


export default function MicrocircuitPage() {
  return (
    <>
      <Head>
        <title>Microcircuit / Digital reconstructions / SSCx Portal</title>
      </Head>

      <MainLayout>
        <MicrocircuitView />
      </MainLayout>
    </>
  );
}
