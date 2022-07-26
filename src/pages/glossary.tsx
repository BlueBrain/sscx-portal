import GlossaryView from '@/views/glossary/Glossary';
import MainLayout from '@/layouts/MainLayout';

import PageMeta from '@/components/PageMeta';
import textContent from '@/text-content/glossary';


export default function Glossary() {
  return (
    <>
      <PageMeta textContent={textContent} />

      <MainLayout>
        <GlossaryView />
      </MainLayout>
    </>
  );
}
