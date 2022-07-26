import MainLayout from '@/layouts/MainLayout';
import NeuronsView from '@/views/validations/Neurons';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/validations/neurons';


export default function NeuronsPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NeuronsView />
      </MainLayout>
    </>
  );
}
