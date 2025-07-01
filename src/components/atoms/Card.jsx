import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  gradient = false,
  ...props 
}) => {
  const baseClasses = `
    glass-card p-6
    ${hover ? 'transform hover:scale-102 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300' : ''}
    ${gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : ''}
    ${className}
  `

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card