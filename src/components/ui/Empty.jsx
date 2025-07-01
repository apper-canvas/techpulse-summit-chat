import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.",
  action,
  icon = "Inbox",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 mb-8 max-w-md">{description}</p>
      {action && (
        <div className="flex gap-4">
          {action}
        </div>
      )}
    </div>
  )
}

export default Empty