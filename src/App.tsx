import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout></MainLayout>
    </ThemeProvider>
  );
}

export default App;
