import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import { NAMA_AYANG } from "../data/konten"
import { HomeIcon, MailHeartIcon, CameraIcon, ClockIcon, HeartSparkleIcon, HeartIcon, EnvelopeIcon, HugIcon, CopyIcon } from "./Icons"

const pages = [
  { path: "/", label: "Home", icon: <HomeIcon size={18} /> },
  { path: "/surat-maaf", label: "Surat", icon: <MailHeartIcon size={18} color="#fff" /> },
  { path: "/gallery", label: "Gallery", icon: <CameraIcon size={18} color="#fff" /> },
  { path: "/love-counter", label: "Timer", icon: <ClockIcon size={18} color="#fff" /> },
  { path: "/alasan-sayang", label: "Alasan", icon: <HeartSparkleIcon size={18} color="#fff" /> },
  { path: "/love-letter", label: "Persyaratan", icon: <EnvelopeIcon size={18} color="#fff" /> },
  { path: "/cek-persyaratan", label: "Cek Persyaratan", icon: <CopyIcon size={18} color="#fff" /> },
  { path: "/pelukan", label: "Pelukan", icon: <HugIcon size={18} color="#fff" /> }
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", top: 15, right: 15,
          zIndex: 1001,
          background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12,
          padding: "10px 14px", fontSize: 20, cursor: "pointer", color: "#fff",
          lineHeight: 1
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
          }
        </svg>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          style={{
            position: "fixed", top: 0, right: 0,
            width: 280, height: "100vh",
            background: "rgba(255, 107, 157, 0.95)", backdropFilter: "blur(20px)",
            zIndex: 1000, padding: "80px 20px 30px",
            overflowY: "auto", boxShadow: "-5px 0 30px rgba(0,0,0,0.2)"
          }}
        >
          <h3 style={{
            color: "#fff", marginBottom: 20, textAlign: "center", fontSize: 17,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <HeartIcon size={18} color="#fff" /> Hai, {NAMA_AYANG}
          </h3>
          {pages.map(p => {
            const active = location.pathname === p.path
            return (
              <Link
                key={p.path}
                to={p.path}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 16px", marginBottom: 5, borderRadius: 12,
                  textDecoration: "none", color: "#fff",
                  background: active ? "rgba(255,255,255,0.2)" : "transparent",
                  fontWeight: active ? 700 : 400, fontSize: 14, transition: "0.2s"
                }}
              >
                {p.icon}
                <span>{p.label}</span>
              </Link>
            )
          })}
        </motion.div>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%", zIndex: 999,
            background: "rgba(0,0,0,0.3)"
          }}
        />
      )}
    </>
  )
}
