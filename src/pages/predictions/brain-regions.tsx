import MainLayout from '@/layouts/MainLayout';
import BrainRegionsView from '@/views/predictions/BrainRegions';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/predictions/brain-regions';


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
