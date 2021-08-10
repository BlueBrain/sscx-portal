import Head from 'next/head';

import HomeView from '../views/Home';
import MainLayout from '../layouts/MainLayout';


export default function Home() {
  return (
    <>
    <Head>
        <title>Home / SSCx Portal</title>
      </Head>

      <MainLayout>
        <HomeView />
      </MainLayout>
    </>
  );
}
