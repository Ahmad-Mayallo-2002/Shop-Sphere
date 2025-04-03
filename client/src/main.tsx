import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import LoggedContext from "./components/contextApi/loggedContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <LoggedContext>
        <App />
      </LoggedContext>
    </Provider>
  </StrictMode>
);
