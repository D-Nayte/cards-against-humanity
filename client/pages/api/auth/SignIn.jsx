import { signIn, getProviders } from "next-auth/react";
import { CgCloseO } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn({ providers, showSignIn, setShowSignIn }) {
  const [redirectTo, setRedirectTo] = useState(null);
  const router = useRouter();

  const handleSignIn = (providerId) => {
    setRedirectTo({
      redirectUrl: router.asPath,
    });
    signIn(providerId, redirectTo);
  };
  if (!showSignIn) return;

  console.log(router, "router signIn");
  return (
    <div className="gameRulesBackdrop">
      <div className="singIn-wrapper">
        <h2>
          <p>Sign in with:</p>
          <button onClick={() => setShowSignIn(false)}>
            <CgCloseO className="signInClose" />
          </button>
        </h2>

        <ul className="authProviderButtonContainer">
          {Object.values(providers).map((provider) => (
            <li>
              {provider.name === "Google" && <FcGoogle className="Google" />}
              <button
                onClick={() => handleSignIn(provider.id)}
                className="authProviderButton"
              >
                {`Sign in with ${provider.name}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
