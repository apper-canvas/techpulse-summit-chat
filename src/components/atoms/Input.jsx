import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  icon, 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-slate-400" />
          </div>
        )}
        <input
          className={`
            w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm
            px-4 py-3 text-slate-100 placeholder-slate-400
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            transition-all duration-200
            ${icon ? 'pl-11' : 'pl-4'}
            ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input