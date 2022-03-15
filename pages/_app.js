import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
}

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp;