import sessionsData from "@/services/mockData/sessions.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sessionService = {
  async getAll() {
    await delay(300)
    return [...sessionsData]
  },

  async getById(id) {
    await delay(200)
    const session = sessionsData.find(s => s.Id === parseInt(id))
    if (!session) {
      throw new Error('Session not found')
    }
    return { ...session }
  },

  async getByTrack(track) {
    await delay(250)
    return sessionsData.filter(s => s.track === track).map(s => ({ ...s }))
  },

async getBySpeakerId(speakerId) {
    await delay(200)
    return sessionsData.filter(s => s.speakerId === parseInt(speakerId)).map(s => ({ ...s }))
  },

  async getFilterOptions() {
    await delay(200)
    
    const tracks = [...new Set(sessionsData.map(s => s.track))]
      .map(track => ({
        value: track,
        label: track,
        count: sessionsData.filter(s => s.track === track).length
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    // Extract topics from session titles and descriptions
    const topics = [...new Set(
      sessionsData.flatMap(s => {
        const title = s.title.toLowerCase()
        const description = s.description.toLowerCase()
        const text = `${title} ${description}`
        
        // Extract key topics/technologies mentioned
        const topicKeywords = [
          'ai', 'artificial intelligence', 'machine learning', 'ml',
          'cloud', 'kubernetes', 'docker', 'microservices',
          'security', 'cybersecurity', 'zero trust',
          'react', 'frontend', 'javascript', 'web',
          'blockchain', 'web3', 'crypto',
          'devops', 'ci/cd', 'deployment',
          'quantum', 'edge computing', 'iot',
          'performance', 'optimization', 'scaling'
        ]
        
        return topicKeywords.filter(keyword => 
          text.includes(keyword) || s.track.toLowerCase().includes(keyword)
        )
      })
    )]
      .map(topic => ({
        value: topic,
        label: topic.charAt(0).toUpperCase() + topic.slice(1),
        count: sessionsData.filter(s => 
          s.title.toLowerCase().includes(topic) || 
          s.description.toLowerCase().includes(topic) ||
          s.track.toLowerCase().includes(topic)
        ).length
      }))
      .filter(topic => topic.count > 0)
      .sort((a, b) => b.count - a.count)

    // Get unique speakers from sessions
    const speakerIds = [...new Set(sessionsData.map(s => s.speakerId))]
    const speakers = speakerIds.map(speakerId => ({
      value: speakerId,
      label: `Speaker ${speakerId}`, // This would normally come from speaker service
      count: sessionsData.filter(s => s.speakerId === speakerId).length
    }))

    return { tracks, topics, speakers }
  },

  getFiltered(sessions, filters) {
    return sessions.filter(session => {
      // Track filter
      if (filters.track && session.track !== filters.track) {
        return false
      }
      
      // Topic filter (search in title, description, and track)
      if (filters.topic) {
        const searchText = `${session.title} ${session.description} ${session.track}`.toLowerCase()
        if (!searchText.includes(filters.topic.toLowerCase())) {
          return false
        }
      }
      
      // Speaker filter
      if (filters.speakerId && session.speakerId !== filters.speakerId) {
        return false
      }
      
      return true
    })
  }