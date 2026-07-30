import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/Resultspage";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <BrowserRouter>
      <CursorGlow />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/exam/:subjectId" element={<ExamPage />} />
        <Route path="/exam/:subjectId/results" element={<ResultsPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
