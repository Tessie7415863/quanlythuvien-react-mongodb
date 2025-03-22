import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminExportTopic from "./features/admin/ExportTopic/ExportTopic";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin">
                    <Route path="exporttopic" element={<AdminExportTopic />} />
                </Route>
            </Routes>
        </Router>
    );
}
