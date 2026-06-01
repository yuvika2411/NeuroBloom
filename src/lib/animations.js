export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const clayHover = {
  scale: 1.03,
  y: -4,
  transition: { type: "spring", stiffness: 300, damping: 20 },
}
