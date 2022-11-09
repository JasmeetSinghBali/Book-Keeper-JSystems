import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps, AppType } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';

const MyApp: AppType = ({ Component, pageProps, router }: AppProps) => {
  return (
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
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </motion.div>
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp);
