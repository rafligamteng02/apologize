import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import supabase from "../lib/supabase"
import { NAMA_AYANG, NAMA_PACAR } from "../data/konten"
import { HeartIcon, SparkleIcon } from "../components/Icons"

const ADMIN_PASSWORD = "rafli123"

export default function Admin() {
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [hangoutRequests, setHangoutRequests] = useState([])
  const [loadingHangout, setLoadingHangout] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      fetchSubmissions()
      fetchHangoutRequests()
    } else {
      alert("Password salah!")
    }
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      alert("Gagal ambil data: " + error.message)
    } else {
      setSubmissions(data || [])
    }
    setLoading(false)
  }

  const fetchHangoutRequests = async () => {
    setLoadingHangout(true)
    const { data, error } = await supabase
      .from("hangout_requests")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      console.warn("Gagal ambil hangout requests:", error.message)
    } else {
      setHangoutRequests(data || [])
    }
    setLoadingHangout(false)
  }

  const handleDeleteHangout = async (id) => {
    if (!confirm("Yakin mau hapus ajakan hangout ini?")) return
    const { error } = await supabase
      .from("hangout_requests")
      .delete()
      .eq("id", id)
    if (error) {
      alert("Gagal hapus: " + error.message)
    } else {
      setHangoutRequests(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus submission ini?")) return
    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("id", id)
    if (error) {
      alert("Gagal hapus: " + error.message)
    } else {
      setSubmissions(prev => prev.filter(s => s.id !== id))
    }
  }

  if (!loggedIn) {
    return (
      <div className="page-center" style={{
        background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 360, width: "90%", textAlign: "center" }}
        >
          <div style={{ marginBottom: 12 }}><HeartIcon size={32} /></div>
          <h2 style={{ color: "#ff6b9d", fontSize: 20, marginBottom: 6 }}>
            Admin Panel
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>
            Masuk buat liat persyaratan dari {NAMA_AYANG}
          </p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 14,
              outline: "none", fontFamily: "inherit", marginBottom: 12,
              textAlign: "center"
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(135deg, #ff6b9d, #c44569)",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14, cursor: "pointer", fontWeight: 600,
              boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
            }}
          >
            Masuk
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #1a0011 0%, #2d0015 50%, #1a0011 100%)",
      paddingTop: 30, paddingBottom: 40, minHeight: "100vh"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 640, width: "90%" }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24
        }}>
          <div>
            <h2 style={{ color: "#ff6b9d", fontSize: 20, margin: 0 }}>
              Admin Panel
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "4px 0 0" }}>
              {submissions.length} submission &middot; {hangoutRequests.length} ajakan hangout
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { fetchSubmissions(); fetchHangoutRequests() }}
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 12,
                cursor: "pointer", fontWeight: 500
              }}
            >
              ↻ Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setLoggedIn(false); setPassword("") }}
              style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)", padding: "8px 14px", borderRadius: 8, fontSize: 12,
                cursor: "pointer", fontWeight: 500
              }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div style={{
            textAlign: "center", padding: 40,
            background: "rgba(255,255,255,0.03)", borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
              Belum ada submission.
            </p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12, marginTop: 8 }}>
              Tunggu {NAMA_AYANG} ngisi persyaratan dulu ya
            </p>
          </div>
        ) : (
          submissions.map((s, i) => {
            const open = expanded === s.id
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, marginBottom: 10, overflow: "hidden"
                }}
              >
                {/* Row */}
                <div
                  onClick={() => setExpanded(open ? null : s.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: "rgba(255,107,157,0.15)",
                      color: "#ff6b9d", fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {i + 1}
                    </span>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: 0 }}>
                        {new Date(s.created_at).toLocaleDateString("id-ID", {
                          weekday: "short", year: "numeric", month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: "2px 0 0" }}>
                        {s.checked_count} dari {s.total_count} dicentang
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: s.checked_count === s.total_count ? "#4ade80" : "#ff6b9d"
                    }}>
                      {s.checked_count}/{s.total_count}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={e => { e.stopPropagation(); handleDelete(s.id) }}
                      style={{
                        background: "rgba(255,50,50,0.15)", border: "none",
                        color: "#ff5050", width: 28, height: 28, borderRadius: 6,
                        cursor: "pointer", fontSize: 14, display: "flex",
                        alignItems: "center", justifyContent: "center"
                      }}
                    >
                      ×
                    </motion.button>
                  </div>
                </div>

                {/* Expanded detail */}
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "14px 18px" }}
                  >
                    <p style={{
                      color: "#ff8fab", fontSize: 11, fontWeight: 600, marginBottom: 8,
                      textTransform: "uppercase", letterSpacing: 1
                    }}>
                      ✅ Dicentang ({s.checked_count})
                    </p>
                    {(s.checked_items || []).map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
                      }}>
                        <span style={{ fontSize: 11 }}>✅</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{item}</span>
                      </div>
                    ))}
                    {s.unchecked_items?.length > 0 && (
                      <>
                        <p style={{
                          color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600,
                          margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: 1
                        }}>
                          ☐ Belum ({s.unchecked_items.length})
                        </p>
                        {(s.unchecked_items || []).map((item, idx) => (
                          <div key={idx} style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.03)"
                          }}>
                            <span style={{ fontSize: 11, opacity: 0.4 }}>⬜</span>
                            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "line-through" }}>{item}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )
          })
        )}

        {/* --- Hangout Requests --- */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "32px 0 24px" }} />

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 16
        }}>
          <div>
            <h3 style={{
              color: "#ff6b9d", fontSize: 16, margin: 0,
              display: "flex", alignItems: "center", gap: 8
            }}>
              <SparkleIcon size={16} /> Ajakan Hangout
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "4px 0 0" }}>
              {hangoutRequests.length} ajakan dari {NAMA_AYANG}
            </p>
          </div>
        </div>

        {loadingHangout ? (
          <div style={{ textAlign: "center", padding: 30 }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Loading...</p>
          </div>
        ) : hangoutRequests.length === 0 ? (
          <div style={{
            textAlign: "center", padding: 30,
            background: "rgba(255,255,255,0.03)", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
              Belum ada ajakan hangout.
            </p>
          </div>
        ) : (
          hangoutRequests.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, marginBottom: 10, padding: "14px 18px"
              }}
            >
              <div style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 6
                  }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: "rgba(255,107,157,0.15)",
                      color: "#ff6b9d", fontSize: 10, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                      {r.activity}
                    </span>
                  </div>
                  <div style={{ marginLeft: 32 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, minWidth: 50 }}>Waktu</span>
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{r.custom_time}</span>
                    </div>
                    {r.message && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, minWidth: 50 }}>Pesan</span>
                        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{r.message}</span>
                      </div>
                    )}
                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: "6px 0 0" }}>
                      {new Date(r.created_at).toLocaleDateString("id-ID", {
                        weekday: "short", year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteHangout(r.id)}
                  style={{
                    background: "rgba(255,50,50,0.15)", border: "none",
                    color: "#ff5050", width: 28, height: 28, borderRadius: 6,
                    cursor: "pointer", fontSize: 14, display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
