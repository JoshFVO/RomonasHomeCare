import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Router from "./router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
        <Router />
      </Authenticator.Provider>
  </StrictMode>
);
