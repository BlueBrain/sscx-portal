import BrainRegionsView from '@/views/digitalReconstructions/BrainRegions';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/digital-reconstructions/brain-regions';


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
