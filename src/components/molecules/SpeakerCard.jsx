import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SpeakerCard = ({ speaker, sessions = [] }) => {
  return (
    <motion.div
      className="speaker-card text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="relative mb-6">
        <motion.img 
          src={speaker.photo} 
          alt={speaker.name}
          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/30"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={16} className="text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-100 mb-1">{speaker.name}</h3>
      <p className="text-primary font-medium mb-1">{speaker.title}</p>
      <p className="text-slate-400 text-sm mb-4">{speaker.company}</p>
      
      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {speaker.bio}
      </p>

      {sessions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Speaking At:</p>
          {sessions.map(session => (
            <div key={session.Id} className="bg-white/5 rounded-lg p-2">
              <p className="text-sm font-medium text-slate-200">{session.title}</p>
              <p className="text-xs text-slate-400">{session.startTime} - {session.endTime}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default SpeakerCard