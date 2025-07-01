import sessionsData from '@/services/mockData/sessions.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
  }
}