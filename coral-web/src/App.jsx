import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
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
      <GlobalStyles />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/community" element={<Community />} />
          <Route path="/demands" element={<ExploreDemands />} />
          <Route path="/discussions" element={<ExploreDiscussions />} />
          <Route path="/demand/:id" element={<DemandDetail />} />
          <Route path="/discussion/:id" element={<DiscussionDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
