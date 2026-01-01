import { LandingPage } from './pages'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ResultsPage from './pages/Results/ResultsPage'
import DetailsPage from './pages/Details/DetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
