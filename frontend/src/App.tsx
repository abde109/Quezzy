import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import QuizzesPage from './pages/QuizzesPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  return (
    <Router>
      <>
      <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Quizzes" element={<QuizzesPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;