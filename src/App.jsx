import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import FloatingHearts from "./components/FloatingHearts"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SuratMaaf from "./pages/SuratMaaf"
import Gallery from "./pages/Gallery"
import LoveCounter from "./pages/LoveCounter"
import AlasanSayang from "./pages/AlasanSayang"
import LoveLetter from "./pages/LoveLetter"
import CekPersyaratan from "./pages/CekPersyaratan"
import Admin from "./pages/Admin"
import Pelukan from "./pages/Pelukan"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/surat-maaf" element={<SuratMaaf />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/love-counter" element={<LoveCounter />} />
          <Route path="/alasan-sayang" element={<AlasanSayang />} />
          <Route path="/love-letter" element={<LoveLetter />} />
          <Route path="/cek-persyaratan" element={<CekPersyaratan />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pelukan" element={<Pelukan />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <FloatingHearts />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
