import { Navigate, Route, Routes } from "react-router-dom";
import ValentinePage from "./pages/ValentinePage";

export default function App() {
  return (
    <Routes>
      <Route path="/valentine/:name" element={<ValentinePage />} />
      <Route path="*" element={<Navigate to="/valentine/my-love" />} />
    </Routes>
  );
}