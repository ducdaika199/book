import { render as renderJest, RenderOptions } from '@testing-library/react';

import TanstackProvider from '@/providers/TanstackProvider';

import ApolloProvider from '@/providers/ApolloProvider';

import AuthProvider from '@/context/AuthContext';

export const renderWithProvider = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  return renderJest(
    <TanstackProvider pageProps={{}}>
      <ApolloProvider>
        <AuthProvider>{ui}</AuthProvider>
      </ApolloProvider>
    </TanstackProvider>,

    options,
  );
};
