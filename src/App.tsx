import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./RouterConfig";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RouterConfig />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
