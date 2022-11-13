import { NextPage } from "next";
import { trpcClient } from "../../utils/Clientrpc";

const SignUp: NextPage = () => {
  
  const newUserOnboarded = trpcClient.user.onboard.useMutation();
  // 🎈
  // redirect to loginPage nextauth passwordless
  return (
    <>
    </>
  );
};

export default SignUp;