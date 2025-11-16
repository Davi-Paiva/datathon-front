import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import PredictionPage from './pages/PredictionPage/PredictionPage';
import HomePage from './pages/HomePage/HomePage';
import ExplainabilityPage from './pages/ExplainabilityPage/ExplainabilityPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Box minH="100vh">
        <NavBar />
        <Box pt="72px">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/explainability" element={<ExplainabilityPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
