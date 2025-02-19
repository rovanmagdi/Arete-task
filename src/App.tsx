// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// react query devtools for debugging queries
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// app routers and lazy loading
import AppRouters from "./routes/AppRouters";
import { lazy } from "react";

const NavBar = lazy(() => import("./components/NavBar"));

function App() {
  // query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    // query client provider
    <QueryClientProvider client={queryClient}>
   
      <AppRouters />
      <ReactQueryDevtools position="left" buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
