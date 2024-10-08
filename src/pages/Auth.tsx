import { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

export default function Auth() {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/");
    }
  }, [authStatus, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Authenticator>
        {({ signOut }) => (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Romona's Home Care</h1>
            <p className="mb-4">
              You're now signed in. Redirecting to your profile...
            </p>
            <button
              onClick={() => {
                signOut?.();
                navigate("/");
              }}
              className="text-blue-500 underline"
            >
              Sign out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}