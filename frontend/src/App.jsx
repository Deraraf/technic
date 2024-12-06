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
import ProtectRoute from "./components/ProtectRoute";
import Profile from "./pages/User/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import RequstForm from "./pages/requests/RequstForm";
import RecentRequest from "./pages/admin/RecentRequest";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/request" element={<RequstForm />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="requestlist" element={<RequestList />} />
          <Route path="recent-requests" element={<RecentRequest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
