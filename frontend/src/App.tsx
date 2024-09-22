import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUser } from './api/userApi';
import Header from './components/Header';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import ListQuiz from './pages/ListQuiz';
import ListedQuiz from './pages/ListedQuiz';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import QuizzesPage from './pages/QuizzesPage';
import RegisterPage from './pages/RegisterPage';
import Settings from './pages/Settings';
import UserDashboard from './pages/UserDashboard';
import { useAppDispatch } from './store';
import { initializeUser } from './store/features/userSlice';
import Profile from './pages/Profile'

const App: React.FC = () => {

    const dispatch = useAppDispatch();
    const userState = useSelector((state: any) => state.user);
    
      useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authUser();
                if (response.data.message === 'Access success') {
                    dispatch(initializeUser(response.data.user));
                }
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };
        fetchUser();
  }, [dispatch]);


  return (
    <Router>
      <div className='flex flex-col h-screen'>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path="/login" element={!userState.isAuth ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Quizzes" element={<QuizzesPage />} />
          <Route path="/register" element={!userState.isAuth ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={userState.role === "user" ? <UserDashboard /> : <AdminDashboard />} />
          <Route path="/list" element={userState.role === "user" ? <NotFound /> : <ListQuiz />} />
          <Route path="/list/:quizId" element={userState.role === "user" ? <NotFound /> : <ListQuiz />} />
          <Route path="/listed" element={userState.role === "user" ? <NotFound /> : <ListedQuiz />} />
          <Route path="/listed/:quizId" element={userState.role === "user" ? <NotFound /> : <ListedQuiz />} />
          <Route 
    path="/settings" 
    element={userState.isAuth ? <Settings /> : <Navigate to="/login" />} 
/>
<Route 
    path="/profile" 
    element={userState.isAuth ? <Profile /> : <Navigate to="/login" />} 
/>

        </Routes>

      </div>
    </Router>
  );
}

export default App;