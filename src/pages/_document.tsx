import Document, { Html, Head, Main, NextScript } from 'next/document'

import { basePath } from '../config';


class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link rel="preconnect" href="https://www.unpkg.com/" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap"
          />

          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/system.js"></script>
          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/extras/named-exports.js"></script>
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
