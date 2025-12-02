import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyCode from './pages/VerifyCode';
import Community from './pages/Community';
import DemandDetail from './pages/DemandDetail';
import DiscussionDetail from './pages/DiscussionDetail';
import ExploreDemands from './pages/ExploreDemands';
import ExploreDiscussions from './pages/ExploreDiscussions';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Home = () => (
  <>
    <Header />
    <Hero />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyles />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/demands" element={
              <ProtectedRoute>
                <ExploreDemands />
              </ProtectedRoute>
            } />
            <Route path="/discussions" element={
              <ProtectedRoute>
                <ExploreDiscussions />
              </ProtectedRoute>
            } />
            <Route path="/demand/:id" element={
              <ProtectedRoute>
                <DemandDetail />
              </ProtectedRoute>
            } />
            <Route path="/discussion/:id" element={
              <ProtectedRoute>
                <DiscussionDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
