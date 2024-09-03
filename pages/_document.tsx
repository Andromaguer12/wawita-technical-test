import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      {/* please note we have all routes inside constants/routes/routes.tsx */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icolawawita.ico" />
        {/* METADATA */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Andrés Carrasquero" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
