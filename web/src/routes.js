import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Admin from "./pages/admin";
import Plan from "./pages/Plan";
import Order from "./pages/Order";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </Router>
    )
}