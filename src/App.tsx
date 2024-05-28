import Header from './components/Header'
import Garage from './pages/Garage'
import Winners from './pages/Winners'
import NotFound from './pages/404'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <header className="pt-5">
        <Header />
      </header>
      <main className="pt-10">
        <Routes>
          <Route path="/" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
