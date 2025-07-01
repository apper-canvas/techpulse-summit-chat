import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' },
    { name: 'GitHub', icon: 'Github', href: '#' }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Tickets', href: '#tickets' },
    { name: 'Venue', href: '#venue' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-surface/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold font-display text-white">
                TechPulse <span className="text-primary">Summit</span>
              </span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              The premier tech conference bringing together innovators, leaders, and visionaries 
              to shape the future of technology. Join us for two transformative days in San Francisco.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name={social.icon} size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-slate-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Mail" size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">info@techpulsesummit.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="Phone" size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">
                    Moscone Center<br />
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="bg-gradient-dark rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on speakers, sessions, and exclusive offers. 
              Be the first to know about TechPulse Summit news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
              />
              <button className="btn-primary whitespace-nowrap">
                <ApperIcon name="Send" size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-slate-400">
            © 2024 TechPulse Summit. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer