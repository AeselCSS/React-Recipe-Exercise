import Layout from "./Layout";
import "./App.css";
import AppRoutes from "./routes/AppRoutes.tsx";

export default function App() {
  //const auth = useAuth();
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}
