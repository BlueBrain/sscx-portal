import BrainRegionsView from '@/views/reconstructionData/BrainRegions';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/reconstruction-data/brain-regions';


export default function BrainRegionsPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <BrainRegionsView />
      </MainLayout>
    </>
  );
}
