import TosView from '@/views/Tos';
import MainLayout from '@/layouts/MainLayout';
import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/terms-of-use';


export default function TermsOfUse() {
  return (
    <>
      <PageMeta textContent={textContent}/>

      <MainLayout>
        <TosView />
      </MainLayout>
    </>
  );
};
