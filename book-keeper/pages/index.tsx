import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const result = trpc.message.useQuery({name: 'jasmeet'});
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
    </div>    
  )
}

export default Home
