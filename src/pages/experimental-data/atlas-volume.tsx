import AtlasVolumeView from '@/views/experimental/AtlasVolume';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/experimental-data/atlas-volume';


export default function AtlasVolumePage() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <AtlasVolumeView />
      </MainLayout>
    </>
  );
}
