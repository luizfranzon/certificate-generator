import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#121214" />
      </Head>
      <body className="bg-gray-800 bg-app bg-no-repeat bg-cover selection:bg-blue-400 selection:text-blue-600">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
