import speakersData from '@/services/mockData/speakers.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const speakerService = {
  async getAll() {
    await delay(400)
    return [...speakersData]
  },

  async getById(id) {
    await delay(200)
    const speaker = speakersData.find(s => s.Id === parseInt(id))
    if (!speaker) {
      throw new Error('Speaker not found')
    }
    return { ...speaker }
  }
}