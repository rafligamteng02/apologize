import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { reasons, NAMA_AYANG } from "../data/konten"
import { HeartSparkleIcon, HeartIcon, SparkleIcon, EnvelopeIcon } from "../components/Icons"

export default function AlasanSayang() {
  const [flipped, setFlipped] = useState({})
  const navigate = useNavigate()

  const toggleFlip = (i) => {
    setFlipped(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      paddingTop: 40
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        <div style={{ marginBottom: 8 }}><HeartSparkleIcon size={36} /></div>
        <h2 style={{ color: "#ff6b9d", fontSize: 22, marginBottom: 10 }}>
          {reasons.length} Alasan Kenapa Aku Sayang Buangett Sama {NAMA_AYANG}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          Klik kartunya buat lihat alasan lengkapnya <SparkleIcon size={14} />
        </p>
      </motion.div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 15, maxWidth: 800, width: "90%", marginBottom: 30
      }}>
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => toggleFlip(i)}
            style={{
              background: flipped[i] ? "rgba(255,107,157,0.15)" : "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${flipped[i] ? "rgba(255,107,157,0.3)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 16, padding: "25px 20px", cursor: "pointer",
              minHeight: 120, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              transition: "0.3s", textAlign: "center"
            }}
          >
            <AnimatePresence mode="wait">
              {flipped[i] ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, rotateY: 180 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6 }}>
                    {r.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ marginBottom: 8 }}><HeartIcon size={28} /></div>
                  <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: 0 }}>
                    {r.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 8 }}>
                    Klik buat baca <SparkleIcon size={12} />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/love-letter")}
        style={{
          background: "linear-gradient(135deg, #ff6b9d, #c44569)", color: "#fff", border: "none",
          padding: "14px 35px", borderRadius: 50, fontSize: 15, cursor: "pointer", fontWeight: 600,
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40,
          boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
        }}
      >
        <EnvelopeIcon size={18} color="#fff" /> Tulis Surat Cinta
      </motion.button>
    </div>
  )
}
