import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { suratMaaf, NAMA_AYANG } from "../data/konten"
import { MailHeartIcon, CameraIcon } from "../components/Icons"

export default function SuratMaaf() {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let i = 0
    const text = suratMaaf.trim()
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [])

  const lines = displayed.split("\n")

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      paddingTop: 40
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          maxWidth: 600,
          width: "90%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "40px 30px",
          marginBottom: 30
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 30 }}>
          <MailHeartIcon size={28} />
          <h2 style={{ color: "#ff6b9d", fontSize: 22, textAlign: "center", margin: 0 }}>
            Surat untuk {NAMA_AYANG}
          </h2>
        </div>

        <div style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: 15,
          lineHeight: 2,
          whiteSpace: "pre-wrap"
        }}>
          {lines.map((line, i) => (
            <p key={i} style={{
              marginBottom: line.trim() ? 8 : 20,
              textIndent: line.trim() && !line.startsWith(" ") ? 20 : 0,
              opacity: line.trim() ? 1 : 0
            }}>
              {line || "\u00A0"}
            </p>
          ))}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 30 }}
          >
            <HeartFillIcon size={24} />
            <div style={{ height: 16 }} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/gallery")}
              style={{
                background: "linear-gradient(135deg, #ff6b9d, #c44569)",
                color: "#fff",
                border: "none",
                padding: "14px 35px",
                borderRadius: 50,
                fontSize: 15,
                cursor: "pointer",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
              }}
            >
              <CameraIcon size={18} color="#fff" /> Lihat Kenangan Kita
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function HeartFillIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6b9d" fillOpacity="0.3" />
    </svg>
  )
}
