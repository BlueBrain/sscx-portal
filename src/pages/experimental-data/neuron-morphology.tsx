import NeuronMorphologyView from '@/views/experimental/NeuronMorphology';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/experimental-data/neuron-morphology';


export default function NeuronMorphologyPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NeuronMorphologyView />
      </MainLayout>
    </>
  );
}
