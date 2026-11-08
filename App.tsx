import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/Resultspage";
import CursorGlow from "./components/CursorGlow";
import ThemeToggle from "./components/ThemeToggle";
import NotesPage from "./pages/Notespage";
import SubjectsPage from "./pages/SubjectsPage";
import SummaryPage from "./pages/SummaryPage";
import AdminPage from "./pages/AdminPage";
import AdminSubjectsPage from "./pages/AdminSubjectsPage";
import AdminQuestionsPage from "./pages/AdminQuestionsPage";
import EssaySubjectsPage from "./pages/EssaySubjectsPage";
import EssayListPage from "./pages/EssayListPage";
import EssayWritePage from "./pages/EssayWritePage";
import EssaySamplePage from "./pages/EssaySamplePage";
import AdminEssaysPage from "./pages/AdminEssaysPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import AchievementsPage from "./pages/AchievementsPage";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import { isSupabaseConfigured } from "./lib/supabase";

function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090c] p-6 text-zinc-200">
      <div className="max-w-lg rounded-2xl border border-yellow-400/25 bg-white/5 p-8">
        <h1 className="text-xl font-bold text-yellow-300">Chưa cấu hình Supabase</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Tạo file <code className="text-yellow-200">.env.local</code> (xem{" "}
          <code className="text-yellow-200">.env.example</code>) với{" "}
          <code className="text-yellow-200">VITE_SUPABASE_URL</code> và{" "}
          <code className="text-yellow-200">VITE_SUPABASE_ANON_KEY</code>, rồi chạy lại{" "}
          <code className="text-yellow-200">npm run dev</code>.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  if (!isSupabaseConfigured) return <SetupNotice />;

  return (
    <BrowserRouter>
      <CursorGlow />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/summary/:subjectId" element={<SummaryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />

        <Route
          path="/exam/:subjectId"
          element={
            <RequireAuth>
              <ExamPage />
            </RequireAuth>
          }
        />
        <Route
          path="/exam/:subjectId/results"
          element={
            <RequireAuth>
              <ResultsPage />
            </RequireAuth>
          }
        />
        <Route path="/essays" element={<EssaySubjectsPage />} />
        <Route path="/essays/:subjectId" element={<EssayListPage />} />
        <Route path="/essays/:subjectId/sample/:sampleId" element={<EssaySamplePage />} />
        <Route path="/essays/:subjectId/:promptId" element={<EssayWritePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/subjects"
          element={
            <RequireAdmin>
              <AdminSubjectsPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/subjects/:subjectId/questions"
          element={
            <RequireAdmin>
              <AdminQuestionsPage />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/subjects/:subjectId/essays"
          element={
            <RequireAdmin>
              <AdminEssaysPage />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
