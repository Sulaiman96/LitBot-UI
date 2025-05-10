import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Index from './pages/Index'
import LoginorRegister from './pages/LoginOrRegister'
import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './pages/NotFound'
import Summarization from './pages/Summarization'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="account" element={<LoginorRegister />} />
          <Route path="summarization" element={<Summarization />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
