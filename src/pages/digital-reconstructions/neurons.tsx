import NeuronsView from '@/views/digitalReconstructions/Neurons';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/digital-reconstructions/neurons';


export default function NeuronsPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NeuronsView />
      </MainLayout>
    </>
  );
};
