import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Registor from "./pages/auth/Registor";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
