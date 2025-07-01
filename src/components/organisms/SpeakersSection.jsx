import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { speakerService } from '@/services/api/speakerService'
import { sessionService } from '@/services/api/sessionService'
import SectionHeader from '@/components/molecules/SectionHeader'
import SpeakerCard from '@/components/molecules/SpeakerCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const SpeakersSection = () => {
  const [speakers, setSpeakers] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [speakersData, sessionsData] = await Promise.all([
        speakerService.getAll(),
        sessionService.getAll()
      ])
      
      setSpeakers(speakersData)
      setSessions(sessionsData)
    } catch (err) {
      setError(err.message || 'Failed to load speakers data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getSpeakerSessions = (speakerId) => {
    return sessions.filter(session => session.speakerId === speakerId)
  }

  if (loading) {
    return (
      <section id="speakers" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Speakers"
            subtitle="Learn from industry pioneers, innovative leaders, and tech visionaries who are shaping the future."
          />
          <Loading type="speakers" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="speakers" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Speakers"
            subtitle="Learn from industry pioneers, innovative leaders, and tech visionaries who are shaping the future."
          />
          <Error message={error} onRetry={loadData} />
        </div>
      </section>
    )
  }

  if (speakers.length === 0) {
    return (
      <section id="speakers" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Speakers"
            subtitle="Learn from industry pioneers, innovative leaders, and tech visionaries who are shaping the future."
          />
          <Empty
            title="Speakers Coming Soon"
            description="We're finalizing our incredible lineup of speakers. Stay tuned for announcements!"
            icon="Users"
          />
        </div>
      </section>
    )
  }

  return (
    <section id="speakers" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Speakers"
          subtitle="Learn from industry pioneers, innovative leaders, and tech visionaries who are shaping the future of technology across every domain."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.Id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 8), duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SpeakerCard
                speaker={speaker}
                sessions={getSpeakerSessions(speaker.Id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-dark rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold font-display text-white mb-4">
              Want to speak at TechPulse Summit?
            </h3>
            <p className="text-xl text-slate-300 mb-8">
              We're always looking for innovative speakers to share their expertise. 
              Join our community of thought leaders and tech pioneers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Apply to Speak
              </button>
              <button className="btn-secondary">
                Nominate a Speaker
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SpeakersSection