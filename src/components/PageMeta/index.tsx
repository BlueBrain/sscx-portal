import React from 'react';
import Head from 'next/head';

import { TextContent } from '@/types';
import { deploymentUrl, basePath } from '@/config';


const PageMeta: React.FC<{ textContent: TextContent }> = ({ textContent }) => {
  return (
    <Head>
      <title>{textContent.head.title}</title>
      <meta property="og:title" content={textContent.head.title} />

      <meta name="description" content={textContent.head.description} />
      <meta property="og:description" content={textContent.head.description} />

      <meta property="og:image" content={`${deploymentUrl}${basePath}/assets/images/sscx-inside-social.jpg`} />
    </Head>
  );
};


export default PageMeta;
