import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import RegisterPage from './pages/RegisterPage';
import ThemeList from './pages/admin/ThemeList';
import ThemeForm from './pages/admin/ThemeForm';
import QuestionList from './pages/admin/QuestionList';
import QuestionForm from './pages/admin/QuestionForm';
import { useEffect } from 'react';

export default function AppRoutes() {
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => { document.body.classList.remove('admin-mode'); }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin CRUD */}
      <Route path="/admin/themes" element={<ThemeList />} />
      <Route path="/admin/themes/new" element={<ThemeForm />} />
      <Route path="/admin/themes/:id/edit" element={<ThemeForm />} />

      <Route path="/admin/questions" element={<QuestionList />} />
      <Route path="/admin/questions/new" element={<QuestionForm />} />
      <Route path="/admin/questions/:id/edit" element={<QuestionForm />} />
    </Routes>
  );
}