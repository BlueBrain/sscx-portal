import MainLayout from '@/layouts/MainLayout';
import MicrocircuitView from '@/views/predictions/Microcircuit';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/predictions/microcircuit';


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
