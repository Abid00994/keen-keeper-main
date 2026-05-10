import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './context/AppContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { FriendDetailsPage } from './pages/FriendDetailsPage'
import { TimelinePage } from './pages/TimelinePage'
import { StatsPage } from './pages/StatsPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/friend/:id" element={<FriendDetailsPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </AppProvider>
  )
}

export default App
