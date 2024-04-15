import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-[#1E1E1E]">
      <div className="w-full block">
        <Header />

        <main className="min-h-96 flex items-center justify-center">
          {/* <Outlet /> */}
          Outlet
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
