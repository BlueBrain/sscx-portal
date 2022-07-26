import SynapticPathwaysView from '@/views/digitalReconstructions/SynapticPathways';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/digital-reconstructions/synaptic-pathways'


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
