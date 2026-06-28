import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { NAMA_AYANG, NAMA_PACAR } from "../data/konten"
import { HeartIcon } from "../components/Icons"

export default function CekPersyaratan() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("erryll-persyaratan")
    if (saved) {
      try { setData(JSON.parse(saved)) } catch { setData(null) }
    }
  }, [])

  if (!data) {
    return (
      <div className="page-center" style={{
        background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", maxWidth: 400 }}
        >
          <div style={{ fontSize: 50, marginBottom: 16 }}>📭</div>
          <h2 style={{ color: "#ff6b9d", fontSize: 20, marginBottom: 12 }}>
            Belum Ada Persyaratan
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>
            {NAMA_AYANG} belum ngirim persyaratan dari browser ini.
          </p>
          <Link to="/love-letter" style={{
            color: "#ff6b9d", textDecoration: "none", fontSize: 14, fontWeight: 600
          }}>
            ← Kembali ke Persyaratan
          </Link>
        </motion.div>
      </div>
    )
  }

  const { date, items } = data
  const checked = items.filter(r => r.checked)
  const unchecked = items.filter(r => !r.checked)
  const d = new Date(date)

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      paddingTop: 40, paddingBottom: 40
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 520, width: "90%" }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <HeartIcon size={36} />
          <h2 style={{ color: "#ff6b9d", fontSize: 20, margin: "10px 0 4px" }}>
            Persyaratan dari {NAMA_AYANG}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            Disubmit: {d.toLocaleDateString("id-ID", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
              hour: "2-digit", minute: "2-digit"
            })}
          </p>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
          padding: "20px", marginBottom: 16
        }}>
          <p style={{
            color: "#4ade80", fontSize: 13, fontWeight: 700, marginBottom: 12,
            textTransform: "uppercase", letterSpacing: 1
          }}>
            ✅ Dicentang ({checked.length})
          </p>
          {checked.map(r => (
            <div key={r.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
              <span style={{ fontSize: 14 }}>✅</span>
              <span style={{ color: "#fff", fontSize: 14 }}>{r.text}</span>
            </div>
          ))}
        </div>

        {unchecked.length > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16,
            padding: "20px", marginBottom: 24
          }}>
            <p style={{
              color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 700, marginBottom: 12,
              textTransform: "uppercase", letterSpacing: 1
            }}>
              ❌ Belum ({unchecked.length})
            </p>
            {unchecked.map(r => (
              <div key={r.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)"
              }}>
                <span style={{ fontSize: 14, opacity: 0.4 }}>⬜</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, textDecoration: "line-through" }}>
                  {r.text}
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#ff6b9d", fontSize: 14, fontStyle: "italic", marginBottom: 20 }}>
            &ldquo;{checked.length} dari {items.length} persyaratan harus dijalanin.&rdquo;
          </p>
          <Link to="/love-letter" style={{
            color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13
          }}>
            ← Kembali ke halaman Persyaratan
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
