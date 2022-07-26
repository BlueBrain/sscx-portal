import HomeView from '../views/Home';
import MainLayout from '../layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/home';



export default function Home() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <HomeView />
      </MainLayout>
    </>
  );
}
