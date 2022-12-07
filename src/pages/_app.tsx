import type { AppProps } from 'next/app';
import React from 'react';
import AuthProvider from '@/context/AuthContext';

import TanstackProvider from '@/providers/TanstackProvider';

import ApolloProvider from '@/providers/ApolloProvider';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TanstackProvider pageProps={pageProps}>
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </TanstackProvider>
    </AuthProvider>
  );
}
