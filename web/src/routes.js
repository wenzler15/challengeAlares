import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Admin from "./pages/admin";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </Router>
    )
}