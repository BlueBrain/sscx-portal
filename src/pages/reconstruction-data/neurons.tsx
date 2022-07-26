import NeuronsView from '@/views/reconstructionData/Neurons';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/reconstruction-data/neurons'


export default function NeuronsPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NeuronsView />
      </MainLayout>
    </>
  );
}
