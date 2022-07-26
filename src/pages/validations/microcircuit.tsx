import MainLayout from '@/layouts/MainLayout';
import MicrocircuitView from '@/views/validations/Microcircuit';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/validations/microcircuit';


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
