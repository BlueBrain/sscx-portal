import MicrocircuitView from '@/views/digitalReconstructions/Microcircuit';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/digital-reconstructions/microcircuit';


export default function MicrocircuitPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <MicrocircuitView />
      </MainLayout>
    </>
  );
}
