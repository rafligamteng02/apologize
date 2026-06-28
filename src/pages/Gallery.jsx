import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { NAMA_AYANG } from "../data/konten"
import { CameraIcon, GalleryIcon, ClockIcon, HeartFillIcon } from "../components/Icons"

const albums = [
  {
    label: "Makan Makan",
    color: "#ff8fab",
    photos: [
      { src: "/images/makan1.jpeg", caption: "Sarapan bareng kamu" },
      { src: "/images/makan2.jpeg", caption: "Lagi bm seblak kamunya ini" },
      { src: "/images/makan3.jpeg", caption: "Makan sambil ngobrol" },
      { src: "/images/makan4.jpeg", caption: "Seblak Date" },
      { src: "/images/makan5.jpeg", caption: "another seblak date" },
      { src: "/images/makan6.jpeg", caption: "Another another seblak date" },
      { src: "/images/makan7.jpeg", caption: "seblak semua isi galeriku 😂" },
    ]
  },
  {
    label: "Liburan",
    color: "#f08aad",
    photos: [
      { src: "/images/liburan1.jpeg", caption: "Jogja ketemu mamitha" },
      { src: "/images/jogja1.jpeg", caption: "Jalan-jalan ke Jogja pertama kali" },
    ]
  },
  {
    label: "Quality Time",
    color: "#ff6b9d",
    photos: [
      { src: "/images/qt1.jpg", caption: "Main guitar hero di burjoo" },
      { src: "/images/qt2.jpg", caption: "Muter2 naik mobil sampe kamu ngantuk" },
    ]
  },
  {
    label: "Sunset Bareng",
    color: "#c44569",
    photos: [
      { src: "/images/nyore1.jpeg", caption: "Golden hour favorit kita" },
    ]
  }
]

const variants = {
  enter: dir => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: dir => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

export default function Gallery() {
  const [albumIdx, setAlbumIdx] = useState(null)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [dir, setDir] = useState(0)
  const navigate = useNavigate()

  const album = albumIdx !== null ? albums[albumIdx] : null

  const openAlbum = useCallback((i) => {
    setAlbumIdx(i)
    setPhotoIdx(0)
    setDir(0)
  }, [])

  const closeAlbum = useCallback(() => {
    setAlbumIdx(null)
    setPhotoIdx(0)
  }, [])

  const next = useCallback(() => {
    if (!album) return
    setDir(1)
    setPhotoIdx(prev => (prev + 1) % album.photos.length)
  }, [album])

  const prev = useCallback(() => {
    if (!album) return
    setDir(-1)
    setPhotoIdx(prev => (prev - 1 + album.photos.length) % album.photos.length)
  }, [album])

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
        <div style={{ marginBottom: 8 }}><CameraIcon size={36} /></div>
        <h2 style={{ color: "#ff6b9d", fontSize: 24, marginBottom: 10 }}>
          Kenangan Kita
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          Klik album buat liat foto-foto kenangan
        </p>
      </motion.div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 15, maxWidth: 700, width: "90%", marginBottom: 30
      }}>
        {albums.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => openAlbum(i)}
            style={{
              background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
              borderRadius: 16, aspectRatio: "1",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)", overflow: "hidden"
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <GalleryIcon label={a.label} size={32} color="#fff" />
            </div>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, textShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
              {a.label}
            </span>
            <span style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.3)", borderRadius: 10,
              padding: "2px 8px", fontSize: 10, color: "#fff"
            }}>
              {a.photos.length} foto
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/love-counter")}
        style={{
          background: "linear-gradient(135deg, #ff6b9d, #c44569)", color: "#fff", border: "none",
          padding: "14px 35px", borderRadius: 50, fontSize: 15, cursor: "pointer", fontWeight: 600,
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40,
          boxShadow: "0 5px 25px rgba(255,107,157,0.4)"
        }}
      >
        <ClockIcon size={18} color="#fff" /> Berapa Lama Kita?
      </motion.button>

      {/* Slideshow Modal */}
      <AnimatePresence>
        {album && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAlbum}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.9)",
              zIndex: 2000,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <div onClick={e => e.stopPropagation()} style={{
              width: "90%", maxWidth: 400,
              display: "flex", flexDirection: "column",
              alignItems: "center"
            }}>
              {/* Album header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", marginBottom: 16
              }}>
                <h3 style={{ color: "#ff6b9d", fontSize: 16, margin: 0 }}>
                  {album.label}
                </h3>
                <button
                  onClick={closeAlbum}
                  style={{
                    background: "rgba(255,255,255,0.15)", border: "none",
                    borderRadius: "50%", width: 32, height: 32,
                    color: "#fff", fontSize: 16, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Photo */}
              <div style={{
                position: "relative", width: "100%",
                aspectRatio: "1", borderRadius: 16, overflow: "hidden",
                marginBottom: 12
              }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={photoIdx}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{
                      width: "100%", height: "100%",
                      borderRadius: 16,
                      overflow: "hidden",
                      position: "relative"
                    }}
                  >
                    {album.photos[photoIdx].src ? (
                      <img
                        src={album.photos[photoIdx].src}
                        alt={album.photos[photoIdx].caption}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        background: `linear-gradient(135deg, ${album.photos[photoIdx].color}, ${album.photos[photoIdx].color}88)`,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <HeartFillIcon size={60} color="#fff" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {album.photos.length > 1 && (
                  <>
                    <button
                      onClick={e => { e.stopPropagation(); prev() }}
                      style={{
                        position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%",
                        width: 36, height: 36, cursor: "pointer", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); next() }}
                      style={{
                        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%",
                        width: 36, height: 36, cursor: "pointer", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}
              {album.photos.length > 1 && (
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  {album.photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setDir(i > photoIdx ? 1 : -1); setPhotoIdx(i) }}
                      style={{
                        width: i === photoIdx ? 20 : 8, height: 8,
                        borderRadius: 4, border: "none", cursor: "pointer",
                        background: i === photoIdx ? "#ff6b9d" : "rgba(255,255,255,0.3)",
                        transition: "0.2s"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Counter */}
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 12 }}>
                Foto {photoIdx + 1} dari {album.photos.length}
              </p>

              {/* Caption */}
              <motion.div
                key={photoIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "14px 18px",
                  textAlign: "center"
                }}
              >
                <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                  "{album.photos[photoIdx].caption}"
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
