import Layout from "./layout";
import HomePage from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/Dashboard";


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}