import { NetworkConnectionConfig } from "./context/NetworkConnectionConfig";
import { Dashboard } from "./sections/Dashboard";
import { Layout } from "./sections/Layout/Layout";

export function App() {

  return (
    <NetworkConnectionConfig>
      <Layout >
        <h3>Multisig Playground</h3>
        <Dashboard />
      </Layout>
    </NetworkConnectionConfig>
  )
}

