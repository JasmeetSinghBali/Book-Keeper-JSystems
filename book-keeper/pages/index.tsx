import type { NextPage } from 'next';
import { trpcClient } from '../utils/Clientrpc';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const {push} = useRouter();

  const result = trpcClient.message.useQuery({name: '🐱‍🚀'});
  console.log(session);

  /**
   * ⭐ redirect: false prevents page refresh on signout
   * ⭐ also callbackUrl specify the page where to redirect the user after they signout change this to landing page url
   */ 
  const handleSignOut = async () => {
    const data = await signOut({redirect: false, callbackUrl: '/landing'});
    push(data.url)
  }

  const handleSignIn = () => signIn();
  
  if(!result.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>  
    )
  }
  return (
    <div>
      <h1>{result.data.greeting}</h1>
      <h4>{result.data.from}</h4>
      {
        session ? 
          (
            <>
              <h3>You are signed in as {session.user?.email}</h3>
              <Button onClick={handleSignOut}>SignOut</Button>
            </>
          )
          : 
          (
            <>
              <h3>You are not signed in</h3>
              <Button onClick={handleSignIn}>SignIn</Button>
            </>
          )
      }
    </div>    
  )
}

export default Home
