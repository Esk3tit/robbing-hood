import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SWRConfig>
    
  )
}

export default MyApp;