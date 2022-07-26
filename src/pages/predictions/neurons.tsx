import MainLayout from '@/layouts/MainLayout';
import NeuronsView from '@/views/predictions/Neurons';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/predictions/neurons';


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
