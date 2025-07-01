import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const HeroSection = () => {
  const scrollToTickets = () => {
    const element = document.querySelector('#tickets')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToSchedule = () => {
    const element = document.querySelector('#schedule')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 geometric-pattern opacity-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-accent/20 rounded-full animate-float [animation-delay:2s] hidden lg:block"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full animate-float [animation-delay:4s] hidden lg:block"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Conference Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ApperIcon name="Calendar" size={16} className="text-primary" />
            <span className="text-slate-200 text-sm font-medium">March 15-16, 2024</span>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <span className="text-slate-200 text-sm font-medium">San Francisco, CA</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              TechPulse
            </span>
            <br />
            <span className="text-white">Summit</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Join 2,000+ tech leaders, innovators, and visionaries for two days of cutting-edge insights, 
            networking, and the future of technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={scrollToTickets}
              className="text-lg px-8 py-4 animate-pulse-glow"
              icon="Ticket"
            >
              Get Your Tickets
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToSchedule}
              className="text-lg px-8 py-4"
              icon="Calendar"
            >
              View Schedule
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {[
              { number: "50+", label: "Expert Speakers" },
              { number: "30+", label: "Tech Sessions" },
              { number: "2000+", label: "Attendees" },
              { number: "6", label: "Tracks" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <ApperIcon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection