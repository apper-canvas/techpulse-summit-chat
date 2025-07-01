import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { sessionService } from '@/services/api/sessionService'
import { speakerService } from '@/services/api/speakerService'
import SectionHeader from '@/components/molecules/SectionHeader'
import SessionCard from '@/components/molecules/SessionCard'
import FilterBar from '@/components/molecules/FilterBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ScheduleSection = () => {
  const [sessions, setSessions] = useState([])
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDay, setSelectedDay] = useState('Day 1')
  
  // Filter states
  const [filterOptions, setFilterOptions] = useState({ tracks: [], topics: [], speakers: [] })
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)

const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [sessionsData, speakersData, filterOptionsData] = await Promise.all([
        sessionService.getAll(),
        speakerService.getAll(),
        sessionService.getFilterOptions()
      ])
      
      setSessions(sessionsData)
      setSpeakers(speakersData)
      setFilterOptions(filterOptionsData)
    } catch (err) {
      setError(err.message || 'Failed to load schedule data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

const getSpeakerById = (speakerId) => {
    return speakers.find(speaker => speaker.Id === speakerId)
  }

  const groupSessionsByTime = (sessions) => {
    const timeSlots = {}
    sessions.forEach(session => {
      const timeKey = `${session.startTime} - ${session.endTime}`
      if (!timeSlots[timeKey]) {
        timeSlots[timeKey] = []
      }
      timeSlots[timeKey].push(session)
    })
    return timeSlots
  }

  // Filter sessions based on selected criteria
  const getFilteredSessions = () => {
    const filters = {}
    
    if (selectedTrack) {
      filters.track = selectedTrack.value
    }
    
    if (selectedTopic) {
      filters.topic = selectedTopic.value
    }
    
    if (selectedSpeaker) {
      filters.speakerId = selectedSpeaker.value
    }

    // If no filters are active, use all sessions
    if (Object.keys(filters).length === 0) {
      return sessions
    }

    return sessionService.getFiltered(sessions, filters)
  }

  // Apply day and filter selection
  const filteredSessions = getFilteredSessions()
  const day1Sessions = filteredSessions.filter((_, index) => index < 6)
  const day2Sessions = filteredSessions.filter((_, index) => index >= 6)
  const currentSessions = selectedDay === 'Day 1' ? day1Sessions : day2Sessions
  const groupedSessions = groupSessionsByTime(currentSessions)

  // Filter handlers
  const handleTrackChange = (option) => {
    setSelectedTrack(option)
  }

  const handleTopicChange = (option) => {
    setSelectedTopic(option)
  }

  const handleSpeakerChange = (option) => {
    setSelectedSpeaker(option)
  }

  const handleClearFilters = () => {
    setSelectedTrack(null)
    setSelectedTopic(null)
    setSelectedSpeaker(null)
  }

  const hasActiveFilters = selectedTrack || selectedTopic || selectedSpeaker

  if (loading) {
    return (
      <section id="schedule" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Schedule"
            subtitle="Two days packed with cutting-edge sessions, workshops, and networking opportunities."
          />
          <Loading type="sessions" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="schedule" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Schedule"
            subtitle="Two days packed with cutting-edge sessions, workshops, and networking opportunities."
          />
          <Error message={error} onRetry={loadData} />
        </div>
      </section>
    )
  }

  if (sessions.length === 0) {
    return (
      <section id="schedule" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Schedule"
            subtitle="Two days packed with cutting-edge sessions, workshops, and networking opportunities."
          />
          <Empty
            title="Schedule Coming Soon"
            description="We're finalizing the conference schedule. Check back soon for updates!"
            icon="Calendar"
          />
        </div>
      </section>
    )
  }

  return (
    <section id="schedule" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Conference Schedule"
          subtitle="Two days packed with cutting-edge sessions, workshops, and networking opportunities designed to accelerate your tech journey."
        />

{/* Filter Bar */}
        <FilterBar
          tracks={filterOptions.tracks}
          topics={filterOptions.topics}
          speakers={filterOptions.speakers}
          selectedTrack={selectedTrack}
          selectedTopic={selectedTopic}
          selectedSpeaker={selectedSpeaker}
          onTrackChange={handleTrackChange}
          onTopicChange={handleTopicChange}
          onSpeakerChange={handleSpeakerChange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            {['Day 1', 'Day 2'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {day}
                <span className="ml-2 text-sm opacity-75">
                  {day === 'Day 1' ? 'March 15' : 'March 16'}
                </span>
              </button>
            ))}
          </div>
        </div>
{/* Schedule Grid */}
        {Object.keys(groupedSessions).length === 0 ? (
          <Empty
            title="No Sessions Found"
            description="No sessions match your current filters. Try adjusting your search criteria."
            icon="Search"
            action={hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-4 px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary-light font-medium rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            )}
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSessions).map(([timeSlot, sessionsInSlot]) => (
              <motion.div
                key={timeSlot}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{timeSlot}</h3>
                  <div className="h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sessionsInSlot.map((session) => (
                    <SessionCard
                      key={session.Id}
                      session={session}
                      speaker={getSpeakerById(session.speakerId)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Schedule Footer */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-dark rounded-2xl p-8">
            <h4 className="text-xl font-bold text-white mb-4">Can't attend a session?</h4>
            <p className="text-slate-300 mb-6">
              All sessions will be recorded and made available to ticket holders for 1 year after the conference.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span>• Live Q&A during sessions</span>
              <span>• Interactive workshops</span>
              <span>• Networking breaks between sessions</span>
              <span>• Digital materials included</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScheduleSection