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
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `Persyaratan_Memaafkan_${NAMA_PACAR}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 3, useCORS: true, letterRendering: true,
          backgroundColor: "#1a0011", width: 595
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(el)
      .save()
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
              Makasih Udah baca semuanya, give me your answer please {NAMA_AYANG}!
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

            {/* PDF element — always in DOM, off-screen */}
            <div ref={pdfRef} style={{
              position: "fixed", left: "-9999px", top: 0, zIndex: -1,
              width: "595px", minHeight: "842px",
              background: "linear-gradient(180deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif", color: "#fff",
              display: "flex", flexDirection: "column"
            }}>
              {/* Top decorative line */}
              <div style={{
                height: 6, background: "linear-gradient(90deg, transparent, #ff6b9d, #ff8fab, transparent)"
              }} />

              {/* Header */}
              <div style={{ textAlign: "center", padding: "50px 50px 30px" }}>
                <div style={{ marginBottom: 15 }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6b9d" fillOpacity="0.2" />
                  </svg>
                </div>
                <h1 style={{
                  color: "#ff6b9d", fontSize: 26, fontWeight: 700,
                  margin: "0 0 6px", letterSpacing: 0.5
                }}>
                  Persyaratan Memaafkan {NAMA_PACAR}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 3, margin: "0 0 15px" }}>
                  ✦ Surat Cinta & Komitmen ✦
                </p>
                <div style={{
                  display: "inline-block",
                  borderTop: "1px solid rgba(255,107,157,0.25)",
                  borderBottom: "1px solid rgba(255,107,157,0.25)",
                  padding: "8px 20px"
                }}>
                  <span style={{ color: "#ff8fab", fontSize: 11, letterSpacing: 1 }}>
                    {NAMA_AYANG.toUpperCase()} — {formatDate(new Date()).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "0 50px 30px" }}>
                {/* Checked section */}
                <div style={{
                  background: "rgba(255,107,157,0.06)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,107,157,0.15)",
                  padding: "20px 24px", marginBottom: 16
                }}>
                  <p style={{
                    color: "#ff8fab", fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 14px"
                  }}>
                    ✅ Dicentang — {reqs.filter(r => r.checked).length}
                  </p>
                  {reqs.filter(r => r.checked).map(r => (
                    <div key={r.id} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "7px 0", borderBottom: "1px solid rgba(255,107,157,0.07)"
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                        background: "#ff6b9d",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span style={{ color: "#fff", fontSize: 12, lineHeight: 1.5 }}>
                        {r.text}
                      </span>
                    </div>
                  ))}
                  {reqs.filter(r => r.checked).length === 0 && (
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontStyle: "italic" }}>
                      Tidak ada yang dicentang
                    </p>
                  )}
                </div>

                {/* Unchecked section */}
                {reqs.filter(r => !r.checked).length > 0 && (
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "20px 24px", marginBottom: 16
                  }}>
                    <p style={{
                      color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 14px"
                    }}>
                      ☐ Belum — {reqs.filter(r => !r.checked).length}
                    </p>
                    {reqs.filter(r => !r.checked).map(r => (
                      <div key={r.id} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
                      }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                          border: "2px solid rgba(255,255,255,0.15)"
                        }} />
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.5, textDecoration: "line-through" }}>
                          {r.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                marginTop: "auto", padding: "30px 50px 40px",
                textAlign: "center",
                borderTop: "1px solid rgba(255,107,157,0.12)"
              }}>
                <div style={{
                  display: "flex", justifyContent: "center", gap: 8,
                  marginBottom: 16
                }}>
                  {[0,1,2,3,4].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 - i * 0.1 }}>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6b9d" fillOpacity="0.15" />
                    </svg>
                  ))}
                </div>
                <p style={{
                  color: "#ff8fab", fontSize: 12, fontWeight: 600,
                  fontStyle: "italic", margin: "0 0 5px"
                }}>
                  &ldquo;{checkedCount} persyaratan ini akan dijalanin dengan sepenuh hati.&rdquo;
                </p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, margin: "0 0 3px" }}>
                  {NAMA_PACAR} 🤍 {NAMA_AYANG}
                </p>
                <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 8 }}>
                  {TANGGAL_JADIAN.getFullYear()} &mdash; selamanya
                </p>
              </div>

              {/* Bottom decorative line */}
              <div style={{
                height: 6, background: "linear-gradient(90deg, transparent, #ff6b9d, #ff8fab, transparent)"
              }} />
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
