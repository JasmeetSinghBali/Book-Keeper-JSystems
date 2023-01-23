import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps, AppType } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion';
import { trpcClient } from '../utils/Clientrpc';
import {SessionProvider} from 'next-auth/react';
import Head from 'next/head';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps }, router }: any) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <AnimatePresence>
          <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity:1
            },
            pageExit: {
              backgroundColor: 'white',
              filter: `saturate(200%)`,
              opacity: 0
            }
          }}>
            <Head>
              <link rel="icon" href="/keeperIcon.png"/>
              <meta name="keywords" content="finance-app,book-keeping,keeper" />
              <meta name="author" content="Jasmeet Singh Bali" />
              <meta name="description" content="Individual | Business Book-Keeping Made Simpler."/>
              <title>Keeper: Individual | Business Book-Keeping Made Simpler</title>
            </Head>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default trpcClient.withTRPC(MyApp);
