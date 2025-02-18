import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { I18nProvider } from "./providers/language/I18nProvider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner"
import { store } from "./stores/store";
import { Provider } from "react-redux";


const App = lazy(() => import("./App"));


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <Provider store={store}>
          <Suspense fallback={<div>Loading</div>}>
            <App />
            <Toaster />
          </Suspense>
        </Provider>
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>
);
