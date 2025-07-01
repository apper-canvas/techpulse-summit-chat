import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SectionHeader from '@/components/molecules/SectionHeader'
import Card from '@/components/atoms/Card'

const AboutSection = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Cutting-Edge Tech',
      description: 'Explore the latest developments in AI, cloud computing, cybersecurity, and emerging technologies that are shaping our future.'
    },
    {
      icon: 'Users',
      title: 'Industry Leaders',
      description: 'Learn from top executives, renowned researchers, and innovative founders from leading tech companies worldwide.'
    },
    {
      icon: 'Network',
      title: 'Networking Hub',
      description: 'Connect with peers, potential partners, and industry experts in our dedicated networking spaces and events.'
    },
    {
      icon: 'BookOpen',
      title: 'Hands-on Learning',
      description: 'Participate in interactive workshops, live coding sessions, and practical demonstrations of new technologies.'
    },
    {
      icon: 'Rocket',
      title: 'Innovation Showcase',
      description: 'Discover groundbreaking startups and revolutionary products in our innovation showcase and demo areas.'
    },
    {
      icon: 'Award',
      title: 'Career Growth',
      description: 'Advance your career with insights from industry veterans, career coaching sessions, and exclusive job opportunities.'
    }
  ]

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Where Tech Innovation Meets"
          subtitle="TechPulse Summit brings together the brightest minds in technology for an unparalleled experience of learning, networking, and innovation. Join us for two transformative days that will shape the future of your career and the industry."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center" gradient>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Conference Highlights */}
        <motion.div 
          className="bg-gradient-dark rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold font-display text-white mb-4">
              Why TechPulse Summit?
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              More than just a conference - it's your gateway to the future of technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                'Access to exclusive beta technologies and product previews',
                'Direct Q&A sessions with tech industry pioneers',
                'Collaborative workshops with hands-on coding experiences',
                'One-on-one mentorship opportunities with industry leaders',
                'Startup pitch competitions with investor panels',
                'Premium networking events in stunning venues'
              ].map((highlight, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <p className="text-slate-200">{highlight}</p>
                </motion.div>
              ))}
            </div>

            <div className="lg:text-center">
              <motion.div 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-64 h-64 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">2024</div>
                    <div className="text-white/90 text-lg">Summit</div>
                  </div>
                </div>
              </motion.div>
              <h4 className="text-2xl font-bold text-white mb-2">March 15-16, 2024</h4>
              <p className="text-slate-300 mb-4">Moscone Center, San Francisco</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-slate-400 text-sm">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">6</div>
                  <div className="text-slate-400 text-sm">Tracks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-slate-400 text-sm">Speakers</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection