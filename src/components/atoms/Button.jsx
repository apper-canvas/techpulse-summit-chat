import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/25',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5'
  }

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-lg font-semibold
    transition-all duration-200 transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${variants[variant]} ${sizes[size]} ${className}
  `

return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" size={16} className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && <ApperIcon name={icon} size={16} />}
      {children}
      {!loading && icon && iconPosition === 'right' && <ApperIcon name={icon} size={16} />}
    </motion.button>
  )
}

export default Button