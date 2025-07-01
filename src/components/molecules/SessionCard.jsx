import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SessionCard = ({ session, speaker }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const trackColors = {
    'AI & Machine Learning': 'from-purple-500 to-pink-500',
    'Cloud & DevOps': 'from-blue-500 to-cyan-500',
    'Security': 'from-red-500 to-orange-500',
    'Frontend': 'from-green-500 to-teal-500',
    'Emerging Tech': 'from-indigo-500 to-purple-500',
    'Blockchain': 'from-yellow-500 to-amber-500'
  }

  return (
    <motion.div
      className="session-card"
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${trackColors[session.track] || 'from-primary to-secondary'} text-white`}>
              {session.track}
            </span>
            <span className="text-sm text-slate-400">
              {session.startTime} - {session.endTime}
            </span>
          </div>
          <h3 className="font-semibold text-slate-100 mb-1">{session.title}</h3>
          {speaker && (
            <p className="text-sm text-slate-300">
              {speaker.name} • {speaker.company}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <ApperIcon name="MapPin" size={14} />
            {session.room}
          </div>
          <ApperIcon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-slate-400" 
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-3 border-t border-white/10">
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                {session.description}
              </p>
              {speaker && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <img 
                    src={speaker.photo} 
                    alt={speaker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-100">{speaker.name}</p>
                    <p className="text-sm text-slate-400">{speaker.title} at {speaker.company}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SessionCard