import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { NAMA_AYANG } from "../data/konten"
import { HeartSparkleIcon, HeartFillIcon, BookIcon } from "../components/Icons"

export default function Home() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const bgHearts = Array.from({ length: 20 }, () => ({
    size: Math.random() * 25 + 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #330022 30%, #4a0028 70%, #1a0011 100%)",
      textAlign: "center",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", width: "100%", height: "100%",
        pointerEvents: "none"
      }}>
        {bgHearts.map((h, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${h.left}%`,
              top: `${h.top}%`,
              opacity: 0.15
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: h.dur,
              repeat: Infinity,
              delay: h.delay
            }}
          >
            <HeartFillIcon size={h.size} color="#ff6b9d" />
          </motion.div>
        ))}
      </div>

      {!show ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginBottom: 20 }}
          >
            <HeartSparkleIcon size={70} />
          </motion.div>
          <h1 style={{
            color: "#ff6b9d",
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 10
          }}>
            Untuk Kamu
          </h1>
          <h2 style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 30
          }}>
            {NAMA_AYANG}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShow(true)}
            style={{
              background: "linear-gradient(135deg, #ff6b9d, #c44569)",
              color: "#fff",
              border: "none",
              padding: "15px 40px",
              borderRadius: 50,
              fontSize: 16,
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
            }}
          >
            Touch Me
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, maxWidth: 500, padding: "0 30px" }}
        >
          <motion.div
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ marginBottom: 20 }}
          >
            <HeartSparkleIcon size={55} />
          </motion.div>
          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 16,
            lineHeight: 1.8,
            marginBottom: 30
          }}>
            "Aku tau kata-kata aja ga cukup.
            Tapi aku mau kamu tau,
            dari sekian banyak orang di muka bumi inihhh,
            aku tetap milih kamu.
            Setiap hari.
            Setiap saat.
            Maafin aku, sengg."
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/surat-maaf")}
            style={{
              background: "linear-gradient(135deg, #ff6b9d, #c44569)",
              color: "#fff",
              border: "none",
              padding: "15px 40px",
              borderRadius: 50,
              fontSize: 16,
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
            }}
          >
            Lanjut Baca Suratnya
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
