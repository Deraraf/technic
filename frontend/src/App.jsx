import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Registor from "./pages/auth/Registor";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./pages/admin/AdminRoutes";
import UserList from "./pages/admin/UserList";
import RequestList from "./pages/admin/RequestList";

function App() {
  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registor />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="requestlist" element={<RequestList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
