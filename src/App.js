import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./HomePage";

const queryClient = new QueryClient(); //새로운 클라이언트 만들기

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
