import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { NAMA_AYANG } from "../data/konten"
import { HugIcon, HeartSparkleIcon, RefreshIcon, ArrowUpIcon } from "../components/Icons"

export default function Pelukan() {
  const navigate = useNavigate()

  return (
    <div className="page-center" style={{
      background: "linear-gradient(135deg, #0d0008 0%, #1a0011 30%, #2d0015 70%, #0d0008 100%)",
      textAlign: "center"
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ maxWidth: 500, width: "90%" }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: 20 }}
        >
          <HugIcon size={80} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ color: "#ff6b9d", fontSize: 26, marginBottom: 20 }}
        >
          Maafin Aku Ya, {NAMA_AYANG}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.8, marginBottom: 25 }}
        >
          Aku nggak akan berhenti minta maaf.
          Tapi yang lebih penting,
          aku nggak akan berhenti berusaha
          jadi yang terbaik buat kamu.

          Kamu berharga.
          Kamu cukup.
          Kamu segalanya buat aku.

          Makasih udah mau baca sampe sini.
          Makasih udah jadi Erryll-ku.
          Makasih udah ada.

          I love you. Always.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ color: "#ff6b9d", fontSize: 13, fontStyle: "italic", marginBottom: 30 }}
        >
          — Dari pacarmu yang nyebelin tapi sayang banget sama kamu
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(135deg, #ff6b9d, #c44569)", color: "#fff", border: "none",
              padding: "14px 35px", borderRadius: 50, fontSize: 15, cursor: "pointer", fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
            }}
          >
            <RefreshIcon size={18} color="#fff" /> Baca Lagi dari Awal
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 30px", borderRadius: 50, fontSize: 14, cursor: "pointer", fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 8
            }}
          >
            <ArrowUpIcon size={16} color="#fff" /> Ke Atas
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
