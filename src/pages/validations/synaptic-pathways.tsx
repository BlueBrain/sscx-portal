import MainLayout from '@/layouts/MainLayout';
import SynapticPathwaysView from '@/views/validations/SynapticPathways';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/validations/synaptic-pathways';


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
