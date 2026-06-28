import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import html2pdf from "html2pdf.js"
import { NAMA_AYANG, NAMA_PACAR, TANGGAL_JADIAN } from "../data/konten"
import { HeartIcon, EnvelopeIcon, DownloadIcon, CopyIcon, HugIcon } from "../components/Icons"

const defaultReqs = [
  { id: 1, text: "Harus lebih perhatian sama aku", checked: false },
  { id: 2, text: "Ajak aku jalan-jalan tiap weekend", checked: false },
  { id: 3, text: "Beliin aku makanan enak", checked: false },
  { id: 4, text: "Gak boleh bikin aku nangis lagi", checked: false },
  { id: 5, text: "Chat duluan kalo lagi berantem", checked: false },
  { id: 6, text: "Bilang I love you tiap hari", checked: false },
  { id: 7, text: "Peluk aku lebih sering", checked: false },
  { id: 8, text: "Sabar sama aku kalo aku lagi bad mood", checked: false },
]

export default function LoveLetter() {
  const [reqs, setReqs] = useState(defaultReqs)
  const [custom, setCustom] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const pdfRef = useRef(null)

  const toggle = (id) => {
    setReqs(prev => prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r))
  }

  const addCustom = () => {
    if (!custom.trim()) return
    const newId = Date.now()
    setReqs(prev => [...prev, { id: newId, text: custom.trim(), checked: true }])
    setCustom("")
  }

  const handleSubmit = () => {
    if (!reqs.some(r => r.checked)) return
    const data = { date: new Date().toISOString(), items: reqs }
    localStorage.setItem("erryll-persyaratan", JSON.stringify(data))
    setSubmitted(true)
  }

  const handleDownloadPDF = () => {
    const el = pdfRef.current
    if (!el) return
    el.style.display = "block"
    el.style.position = "fixed"
    el.style.left = "-9999px"
    el.style.top = "0"
    el.style.zIndex = -1

    html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename: `Persyaratan_Memaafkan_${NAMA_PACAR}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2, useCORS: true, letterRendering: true,
          backgroundColor: "#1a0011"
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(el)
      .save()
      .then(() => { el.style.display = "none" })
  }

  const handleCopy = () => {
    const checked = reqs.filter(r => r.checked).map(r => r.text)
    const unchecked = reqs.filter(r => !r.checked).map(r => r.text)
    const today = new Date().toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    })
    let text = `📋 PERSYARATAN MEMAAFKAN ${NAMA_PACAR}\n`
    text += `${"=".repeat(35)}\n`
    text += `${NAMA_AYANG} • ${today}\n\n`
    text += `✅ DICENTANG (${checked.length}):\n`
    checked.forEach(t => { text += `   ✅ ${t}\n` })
    text += `\n❌ BELUM:\n`
    unchecked.forEach(t => { text += `   ❌ ${t}\n` })
    text += `\n${"=".repeat(35)}\n`
    text += `${NAMA_PACAR}, jangan lupa dijalanin! 🥹💕`
    navigator.clipboard.writeText(text).then(() => {
      alert("Tersalin ke clipboard! Tinggal paste ke chat ya 🥰")
    })
  }

  const checkedCount = reqs.filter(r => r.checked).length
  const totalCount = reqs.length

  const formatDate = (d) => d.toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  })

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      paddingTop: 40, paddingBottom: 40,
      minHeight: "100vh"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 520, width: "90%", textAlign: "center" }}
      >
        {!submitted ? (
          <>
            <div style={{ marginBottom: 8 }}><EnvelopeIcon size={36} /></div>
            <h2 style={{ color: "#ff6b9d", fontSize: 22, marginBottom: 6 }}>
              Persyaratan Memaafkan {NAMA_PACAR}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 20 }}>
              {NAMA_AYANG}, centang apa aja yang harus {NAMA_PACAR} lakuin biar kamu maafin dia... 🥹
            </p>

            <div style={{
              background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
              padding: "20px", marginBottom: 16, textAlign: "left"
            }}>
              {reqs.map(r => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => toggle(r.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", marginBottom: 4, borderRadius: 10,
                    cursor: "pointer", transition: "0.2s",
                    background: r.checked ? "rgba(255,107,157,0.12)" : "transparent"
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                    border: `2px solid ${r.checked ? "#ff6b9d" : "rgba(255,255,255,0.25)"}`,
                    background: r.checked ? "#ff6b9d" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "0.2s"
                  }}>
                    {r.checked && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    color: r.checked ? "#fff" : "rgba(255,255,255,0.7)",
                    fontSize: 14, textDecoration: r.checked ? "line-through" : "none",
                    transition: "0.2s"
                  }}>
                    {r.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input
                value={custom}
                onChange={e => setCustom(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCustom()}
                placeholder="Tambah persyaratan lain..."
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: 13,
                  outline: "none", fontFamily: "inherit"
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addCustom}
                disabled={!custom.trim()}
                style={{
                  background: custom.trim()
                    ? "linear-gradient(135deg, #ff6b9d, #c44569)"
                    : "rgba(255,255,255,0.1)",
                  color: "#fff", border: "none", borderRadius: 10,
                  padding: "10px 14px", fontSize: 13,
                  cursor: custom.trim() ? "pointer" : "not-allowed",
                  fontWeight: 600, opacity: custom.trim() ? 1 : 0.4
                }}
              >
                Tambah
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={checkedCount === 0}
              style={{
                background: checkedCount > 0
                  ? "linear-gradient(135deg, #ff6b9d, #c44569)"
                  : "rgba(255,255,255,0.1)",
                color: "#fff", border: "none",
                padding: "14px 35px", borderRadius: 50, fontSize: 15,
                cursor: checkedCount > 0 ? "pointer" : "not-allowed",
                fontWeight: 600, opacity: checkedCount > 0 ? 1 : 0.4,
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40,
                boxShadow: checkedCount > 0 ? "0 5px 25px rgba(255,107,157,0.4)" : "none"
              }}
            >
              <HeartIcon size={16} color="#fff" /> Kirim Persyaratan ({checkedCount})
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "10px 0 30px" }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: 50, marginBottom: 12 }}
            >
              🥹💕
            </motion.div>
            <h2 style={{ color: "#ff6b9d", fontSize: 20, marginBottom: 10 }}>
              Makasih Udah Ngasih Aku Kesempatan, {NAMA_AYANG}!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, marginBottom: 4 }}>
              {checkedCount} dari {totalCount} persyaratan udah dicatat.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontStyle: "italic", marginBottom: 20 }}>
              Aku janji bakal ngejalanin semuanya dengan sepenuh hati.
            </p>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
                padding: "20px", marginBottom: 20, textAlign: "left"
              }}
            >
              <p style={{
                color: "#ff6b9d", fontSize: 13, fontWeight: 700, marginBottom: 12,
                textTransform: "uppercase", letterSpacing: 1
              }}>
                Ringkasan Persyaratan
              </p>
              {reqs.map(r => (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <span style={{
                    fontSize: 14, color: r.checked ? "#4ade80" : "rgba(255,255,255,0.3)"
                  }}>
                    {r.checked ? "✅" : "⬜"}
                  </span>
                  <span style={{
                    color: r.checked ? "#fff" : "rgba(255,255,255,0.35)",
                    fontSize: 13, textDecoration: r.checked ? "none" : "line-through"
                  }}>
                    {r.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Hidden PDF element */}
            <div ref={pdfRef} style={{
              display: "none", width: "595px", padding: "40px",
              background: "linear-gradient(135deg, #1a0011, #2d0015)",
              fontFamily: "'Poppins', sans-serif", color: "#fff"
            }}>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6b9d" fillOpacity="0.15" />
                </svg>
                <h1 style={{ color: "#ff6b9d", fontSize: 22, margin: "15px 0 5px", fontWeight: 700 }}>
                  Persyaratan Memaafkan {NAMA_PACAR}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                  {NAMA_AYANG} • {formatDate(new Date())}
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,107,157,0.3)", paddingTop: 20, marginBottom: 20 }}>
                {reqs.map(r => (
                  <div key={r.id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", marginBottom: 4, borderRadius: 8,
                    background: r.checked ? "rgba(255,107,157,0.08)" : "transparent"
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: `2px solid ${r.checked ? "#ff6b9d" : "rgba(255,255,255,0.2)"}`,
                      background: r.checked ? "#ff6b9d" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {r.checked && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span style={{
                      color: r.checked ? "#fff" : "rgba(255,255,255,0.4)",
                      fontSize: 12, textDecoration: r.checked ? "none" : "line-through"
                    }}>
                      {r.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,107,157,0.3)", paddingTop: 20, textAlign: "center" }}>
                <p style={{ color: "#ff6b9d", fontSize: 12, fontStyle: "italic", marginBottom: 4 }}>
                  &ldquo;{checkedCount} persyaratan harus dijalanin dengan sepenuh hati.&rdquo;
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 20 }}>
                  {NAMA_PACAR} 🤍 {NAMA_AYANG} • {TANGGAL_JADIAN.getFullYear()}-sekarang
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadPDF}
                style={{
                  background: "linear-gradient(135deg, #ff6b9d, #c44569)",
                  color: "#fff", border: "none",
                  padding: "14px", borderRadius: 12, fontSize: 14,
                  cursor: "pointer", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
                }}
              >
                <DownloadIcon size={18} /> Download PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
                  padding: "14px", borderRadius: 12, fontSize: 14,
                  cursor: "pointer", fontWeight: 500,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                <CopyIcon size={18} /> Salin ke Clipboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/pelukan")}
                style={{
                  background: "transparent",
                  color: "#ff6b9d", border: "1px solid #ff6b9d",
                  padding: "14px", borderRadius: 12, fontSize: 14,
                  cursor: "pointer", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                <HugIcon size={18} color="#ff6b9d" /> Lanjut ke Pelukan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
