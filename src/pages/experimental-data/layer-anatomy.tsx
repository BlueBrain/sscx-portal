import LayerAnatomyView from '@/views/experimental/LayerAnatomy';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/experimental-data/layer-anatomy';


export default function LayerAnatomy() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <LayerAnatomyView />
      </MainLayout>
    </>
  );
}
