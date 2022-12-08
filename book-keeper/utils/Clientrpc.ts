import { httpBatchLink, OperationLink, TRPCClientRuntime } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';
import { httpLink,splitLink } from '@trpc/react-query';



// 📝 custom headers on trpc client procedures-> https://github.com/trpc/trpc/issues/2018
// 📝 https://trpc.io/docs/v9/links#request-batching

/**set trpc/server instance base url where trpc/client will make request */
function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}


export const trpcClient = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        splitLink({
          condition(op) {
            return op.context.skipBatch === true;
          },
          true: httpLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
          false: httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`
          })
        }),
      ],
      queryClientConfig:{
        defaultOptions:{
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false
          }
        }
      }
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
});
// => { useQuery: ..., useMutation: ...}


// 💭 helpers
// httpBatchLink({
//   /**
//    * If you want to use SSR, you need to use the server's full URL
//    * @link https://trpc.io/docs/ssr
//    **/
//   url: `${getBaseUrl()}/api/trpc`,
//   /**
//    * ref: https://trpc.io/docs/ssr
//    * Headers as function that will be called on each request 
//    * from trpc/client instance ---> trpc/server instance
//    */
//   //  headers: () => {
//   //   const grabbedToken: string = currentUserRPCToken(state=>state.token);
//   //   if(grabbedToken && grabbedToken.length > 0){
//   //     return {
//   //       Authorization: `Bearer ${grabbedToken}`,
//   //     };
//   //   }
//   //   return {
//   //     Authorization: `Bearer placeholder`,
//   //   };
//   // },
// }),