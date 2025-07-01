import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const TicketCard = ({ ticket, isSelected, onSelect, quantity, onQuantityChange }) => {
  const tierColors = {
    'Early Bird': 'from-green-500/20 to-teal-500/20 border-green-500/30',
    'Professional': 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
    'Enterprise': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Student': 'from-orange-500/20 to-amber-500/20 border-orange-500/30'
  }

  const tierIcons = {
    'Early Bird': 'Clock',
    'Professional': 'Briefcase',
    'Enterprise': 'Crown',
    'Student': 'GraduationCap'
  }

  return (
    <motion.div
      className={`ticket-card relative overflow-hidden ${
        isSelected ? 'ring-2 ring-primary shadow-xl shadow-primary/20' : ''
      } ${tierColors[ticket.tier] || 'from-slate-500/20 to-slate-600/20 border-slate-500/30'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Popular badge for Professional tier */}
      {ticket.tier === 'Professional' && (
        <div className="absolute -top-3 -right-3 bg-gradient-primary text-white px-6 py-1 rounded-full text-sm font-semibold transform rotate-12">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={tierIcons[ticket.tier]} size={24} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-100 mb-2">{ticket.tier}</h3>
        <p className="text-slate-300 text-sm mb-4">{ticket.description}</p>
        <div className="text-4xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
          ${ticket.price}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {ticket.perks.map((perk, index) => (
          <motion.div 
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            viewport={{ once: true }}
          >
            <div className="w-5 h-5 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ApperIcon name="Check" size={12} className="text-white" />
            </div>
            <span className="text-slate-300 text-sm">{perk}</span>
          </motion.div>
        ))}
      </div>

      {isSelected && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
            <span className="text-slate-300 font-medium">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                disabled={quantity <= 1}
              >
                <ApperIcon name="Minus" size={14} />
              </button>
              <span className="text-slate-100 font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                disabled={quantity >= 10}
              >
                <ApperIcon name="Plus" size={14} />
              </button>
            </div>
          </div>
          {quantity > 1 && (
            <div className="text-center mt-2">
              <span className="text-slate-400 text-sm">
                Total: <span className="text-accent font-semibold">${(ticket.price * quantity).toLocaleString()}</span>
              </span>
            </div>
          )}
        </motion.div>
      )}

      <Button
        variant={isSelected ? "secondary" : "primary"}
        className="w-full"
        onClick={() => onSelect(ticket.tier)}
        disabled={!ticket.available}
      >
        {isSelected ? 'Selected' : ticket.available ? 'Select Ticket' : 'Sold Out'}
        <ApperIcon name={isSelected ? "Check" : "ArrowRight"} size={16} />
      </Button>
    </motion.div>
  )
}

export default TicketCard