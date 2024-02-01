import { NetworkConnectionProvider } from "./context/NetworkConnectionContext";
import { Dashboard } from "./sections/Dashboard";
import { Layout } from "./sections/Layout/Layout";

export function App() {

  return (
    <NetworkConnectionProvider>
      <Layout >
        <h3>Playground fuel</h3>
        <Dashboard />
      </Layout>
    </NetworkConnectionProvider>
  )
}

