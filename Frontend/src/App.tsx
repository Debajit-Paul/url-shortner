import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Header from "./components/ui/Header";
import ProtectedRoutes from "./components/ui/ProtectedRoutes";
const App = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="w-screen h-screen bg-custom-gradient [filter:blur(100px)saturate(150%)] opacity-15 absolute top-0 left-0 z-0"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
