import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class myDocument extends Document {
  render() {
    return (
      <Html>
        {/* <Head></Head> */}
        <body>
          <Main>
            <NextScript />
          </Main>
        </body>
      </Html>
    );
  }
}
