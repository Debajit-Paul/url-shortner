import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Header from "./components/ui/Header";
import ProtectedRoutes from "./components/ui/ProtectedRoutes";
const App = () => {
  return (
    <div className="flex flex-col">
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
