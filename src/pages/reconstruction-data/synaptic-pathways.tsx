import SynapticPathwaysView from '@/views/reconstructionData/SynapticPathways';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/reconstruction-data/synaptic-pathways';


export default function SynapticPathwaysPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <SynapticPathwaysView />
      </MainLayout>
    </>
  );
}
