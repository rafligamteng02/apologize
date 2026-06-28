import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { NAMA_AYANG, TANGGAL_JADIAN } from "../data/konten"
import { ClockIcon, HeartSparkleIcon } from "../components/Icons"

function hitungWaktu() {
  const now = new Date()
  const diff = now - TANGGAL_JADIAN
  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const years = Math.floor(totalDays / 365)
  const months = Math.floor((totalDays % 365) / 30)
  const days = Math.floor(totalDays % 30)
  const hours = totalHours % 24
  const minutes = totalMinutes % 60
  const seconds = totalSeconds % 60
  return { years, months, days, hours, minutes, seconds, totalDays, totalHours, totalMinutes, totalSeconds }
}

function formatNumber(n) {
  return n.toString().padStart(2, "0")
}

export default function LoveCounter() {
  const [time, setTime] = useState(hitungWaktu())
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => { setTime(hitungWaktu()) }, 1000)
    return () => clearInterval(interval)
  }, [])

  const boxes = [
    { label: "Tahun", value: time.years },
    { label: "Bulan", value: time.months },
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ]

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      textAlign: "center"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 600, width: "90%" }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginBottom: 10 }}
        >
          <ClockIcon size={50} />
        </motion.div>
        <h2 style={{ color: "#ff6b9d", fontSize: 22, marginBottom: 5 }}>
          Kita Udah Bareng Selama...
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 30, fontStyle: "italic" }}>
          11 Juni 2021 — {NAMA_AYANG} & kamu
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 30
        }}>
          {boxes.map(b => (
            <motion.div
              key={b.label}
              whileHover={{ scale: 1.05 }}
              style={{
                background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 10px"
              }}
            >
              <motion.span
                key={b.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ display: "block", fontSize: 34, fontWeight: 700, color: "#ff6b9d" }}
              >
                {formatNumber(b.value)}
              </motion.span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, textTransform: "uppercase", letterSpacing: 2 }}>
                {b.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 30 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "15px 10px" }}>
            <span style={{ display: "block", fontSize: 22, fontWeight: 700, color: "#ff6b9d" }}>
              {formatNumber(time.totalDays)}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              Total Hari
            </span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "15px 10px" }}>
            <span style={{ display: "block", fontSize: 22, fontWeight: 700, color: "#ff6b9d" }}>
              {formatNumber(time.totalHours)}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              Total Jam
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/alasan-sayang")}
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44569)", color: "#fff", border: "none",
            padding: "14px 35px", borderRadius: 50, fontSize: 15, cursor: "pointer", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
          }}
        >
          <HeartSparkleIcon size={18} color="#fff" /> Kenapa Aku Sayang Kamu?
        </motion.button>
      </motion.div>
    </div>
  )
}
