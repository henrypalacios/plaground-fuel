import { NetworkConnectionConfig } from "./context/NetworkConnectionConfig";
import { Dashboard } from "./sections/Dashboard";
import { Layout } from "./sections/Layout/Layout";

export function App() {

  return (
    <NetworkConnectionConfig>
      <Layout >
        <Dashboard />
      </Layout>
    </NetworkConnectionConfig>
  )
}

