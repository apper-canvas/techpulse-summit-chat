import React from 'react'
import { motion } from 'framer-motion'

const SectionHeader = ({ title, subtitle, centered = true, className = "" }) => {
  return (
    <motion.div 
      className={`${centered ? 'text-center' : ''} mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeader