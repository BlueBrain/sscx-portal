import Document, { Html, Head, Main, NextScript } from 'next/document'

import { basePath } from '../config';


class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap"
          />

          <script type="systemjs-importmap" src={`${basePath}/systemjs-importmap.json`}></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


export default AppDocument;
