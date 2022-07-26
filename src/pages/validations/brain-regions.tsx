import MainLayout from '@/layouts/MainLayout';
import BrainRegionsView from '@/views/validations/BrainRegions';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/validations/brain-regions';


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
