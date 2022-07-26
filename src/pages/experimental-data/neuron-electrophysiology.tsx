import NeuronElectrophysiologyView from '@/views/experimental/NeuronElectrophysiology';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/experimental-data/neuron-electrophysiology';


export default function NeuronElectrophysiologyPage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <NeuronElectrophysiologyView />
      </MainLayout>
    </>
  );
}
