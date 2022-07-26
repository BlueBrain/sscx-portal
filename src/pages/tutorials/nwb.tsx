import NwbTutorialView from '@/views/tutorials/Nwb';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/tutorials/nwb';


export default function NwbTutorialPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NwbTutorialView />
      </MainLayout>
    </>
  );
}
