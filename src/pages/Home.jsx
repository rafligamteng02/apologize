import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import supabase from "../lib/supabase"
import { NAMA_AYANG, NAMA_PACAR } from "../data/konten"
import {
  HeartSparkleIcon, HeartFillIcon, HeartIcon,
  FilmIcon, FoodIcon, CoffeeIcon, WalkIcon,
  HomeIcon as HomeIconSvg, SparkleIcon
} from "../components/Icons"

const activities = [
  { id: "nonton", label: "Nonton Film", icon: <FilmIcon size={32} /> },
  { id: "makan", label: "Makan Bareng", icon: <FoodIcon size={32} /> },
  { id: "ngopi", label: "Ngopi", icon: <CoffeeIcon size={32} /> },
  { id: "jalan", label: "Muter2 Cari Angin", icon: <WalkIcon size={32} /> },
  { id: "chill", label: "Chill di Kost", icon: <HomeIconSvg size={32} color="#ff6b9d" /> },
  { id: "lainnya", label: "Lainnya", icon: <SparkleIcon size={32} /> },
]

export default function Home() {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [customTime, setCustomTime] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sentToDb, setSentToDb] = useState(false)
  const navigate = useNavigate()

  const bgHearts = Array.from({ length: 12 }, () => ({
    size: Math.random() * 20 + 8,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))

  const canSubmit = selectedActivity && customTime.trim()

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    supabase.from("hangout_requests").insert({
      activity: selectedActivity,
      custom_time: customTime.trim(),
      message: message.trim()
    }).then(({ error }) => {
      if (error) {
        console.warn("Supabase insert error:", error.message)
      } else {
        setSentToDb(true)
      }
    })
  }

  const getActivityLabel = (id) => {
    return activities.find(a => a.id === id)?.label || id
  }

  if (submitted) {
    return (
      <div className="page-center" style={{
        background: "linear-gradient(135deg, #1a0011 0%, #330022 30%, #4a0028 70%, #1a0011 100%)",
        minHeight: "100vh", paddingTop: 40, paddingBottom: 40
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ maxWidth: 480, width: "90%", textAlign: "center" }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginBottom: 16 }}
          >
            <HeartSparkleIcon size={56} />
          </motion.div>

          <h2 style={{ color: "#ff6b9d", fontSize: 22, marginBottom: 8 }}>
            Makasih sayang!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 20 }}>
            Aku tunggu kabar kamu ya, {NAMA_AYANG}
          </p>

          <div style={{
            background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
            padding: "20px", marginBottom: 20, textAlign: "left"
          }}>
            <p style={{
              color: "#ff8fab", fontSize: 12, fontWeight: 600, marginBottom: 12,
              textTransform: "uppercase", letterSpacing: 1
            }}>
              Ringkasan
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", minWidth: 60 }}>Aktivitas</span>
              <span style={{ color: "#fff", fontSize: 14 }}>{getActivityLabel(selectedActivity)}</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", minWidth: 60 }}>Waktu</span>
              <span style={{ color: "#fff", fontSize: 14 }}>{customTime}</span>
            </div>
            {message.trim() && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", minWidth: 60 }}>Pesan</span>
                <span style={{ color: "#fff", fontSize: 14 }}>{message}</span>
              </div>
            )}
          </div>

          {sentToDb && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: 12, padding: "12px 16px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <div style={{ textAlign: "left" }}>
                <p style={{ color: "#4ade80", fontSize: 13, fontWeight: 600, margin: 0 }}>
                  Pesan kamu udah masuk!
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "2px 0 0" }}>
                  {NAMA_PACAR} bakal liat dari dashboard admin
                </p>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/gallery")}
            style={{
              background: "linear-gradient(135deg, #ff6b9d, #c44569)", color: "#fff", border: "none",
              padding: "14px 35px", borderRadius: 50, fontSize: 15, cursor: "pointer", fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
              boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
            }}
          >
            <HeartIcon size={16} color="#fff" /> Lanjut ke Gallery
          </motion.button>

          <div>
            <button
              onClick={() => navigate("/surat-maaf")}
              style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13,
                cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3,
                fontFamily: "inherit", padding: 0
              }}
            >
              Baca surat dari {NAMA_PACAR}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #330022 30%, #4a0028 70%, #1a0011 100%)",
      minHeight: "100vh", paddingTop: 40, paddingBottom: 40,
      overflow: "hidden", position: "relative"
    }}>
      <div style={{
        position: "absolute", width: "100%", height: "100%", top: 0, left: 0,
        pointerEvents: "none"
      }}>
        {bgHearts.map((h, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute", left: `${h.left}%`, top: `${h.top}%`, opacity: 0.1
            }}
            animate={{ y: [0, -30, 0], scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: h.dur, repeat: Infinity, delay: h.delay }}
          >
            <HeartFillIcon size={h.size} color="#ff6b9d" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 520, width: "90%", position: "relative", zIndex: 1 }}
      >
        <div style={{ marginBottom: 8 }}>
          <HeartSparkleIcon size={44} />
        </div>
        <h1 style={{
          color: "#ff6b9d", fontSize: 26, fontWeight: 700, marginBottom: 4
        }}>
          Wanna Hang Out Today?
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24
        }}>
          {NAMA_AYANG}, pilih aktivitas yang kamu mau
        </p>

        <div style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
          padding: "20px", marginBottom: 16
        }}>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, marginBottom: 14,
            textTransform: "uppercase", letterSpacing: 1
          }}>
            Mau ngapain?
          </p>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10
          }}>
            {activities.map((a) => {
              const active = selectedActivity === a.id
              return (
                <motion.button
                  key={a.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedActivity(a.id)}
                  style={{
                    flex: "1 1 calc(50% - 5px)", minWidth: 0,
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "14px 16px", borderRadius: 12,
                    background: active ? "rgba(255,107,157,0.12)" : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(255,107,157,0.4)" : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer", color: "#fff", fontSize: 13,
                    fontFamily: "inherit", fontWeight: active ? 600 : 400,
                    transition: "0.2s", textAlign: "left"
                  }}
                >
                  {a.icon}
                  <span>{a.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
          padding: "20px", marginBottom: 16
        }}>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, marginBottom: 10,
            textTransform: "uppercase", letterSpacing: 1
          }}>
            Kapan?
          </p>
          <input
            value={customTime}
            onChange={e => setCustomTime(e.target.value)}
            placeholder="Misal: hari ini jam 3, besok sore, nanti aku kabarin..."
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: 13,
              outline: "none", fontFamily: "inherit",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
          padding: "20px", marginBottom: 20
        }}>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, marginBottom: 10,
            textTransform: "uppercase", letterSpacing: 1
          }}>
            Pesan tambahan
          </p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ketik pesan buat Rafli..."
            rows={3}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: 13,
              outline: "none", fontFamily: "inherit", resize: "vertical",
              boxSizing: "border-box"
            }}
          />
        </div>

        <motion.button
          whileHover={canSubmit ? { scale: 1.05 } : {}}
          whileTap={canSubmit ? { scale: 0.95 } : {}}
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            background: canSubmit
              ? "linear-gradient(135deg, #ff6b9d, #c44569)"
              : "rgba(255,255,255,0.1)",
            color: "#fff", border: "none",
            padding: "14px 35px", borderRadius: 50, fontSize: 15,
            cursor: canSubmit ? "pointer" : "not-allowed",
            fontWeight: 600, opacity: canSubmit ? 1 : 0.4,
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: canSubmit ? "0 5px 25px rgba(255,107,157,0.4)" : "none",
            width: "100%", justifyContent: "center"
          }}
        >
          <HeartIcon size={16} color="#fff" /> Kirim Jawaban
        </motion.button>
      </motion.div>
    </div>
  )
}
