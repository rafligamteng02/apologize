import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function HeartSVG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6b9d" fillOpacity="0.2" />
    </svg>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random()
      const size = Math.random() * 20 + 12
      setHearts(prev => [...prev.slice(-15), {
        id, x: Math.random() * 100, size,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2
      }])
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 999, overflow: "hidden"
    }}>
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", x: `${h.x}vw`, opacity: 1, scale: 0 }}
            animate={{
              y: "-10vh",
              opacity: [1, 0.8, 0],
              scale: [0, 1, 0.5],
              rotate: [0, 15, -15, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: h.duration, delay: h.delay, ease: "linear"
            }}
            style={{ position: "absolute" }}
          >
            <HeartSVG size={h.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
