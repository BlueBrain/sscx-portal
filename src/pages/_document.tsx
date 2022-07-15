import Document, { Html, Head, Main, NextScript } from 'next/document'


class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="systemjs-importmap"
            dangerouslySetInnerHTML={{
              __html: `{
                "imports": {
                  "react": "https://unpkg.com/react@17.0.2/umd/react.production.min.js",
                  "react-dom": "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"
                }
              }`
            }}
          />
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
