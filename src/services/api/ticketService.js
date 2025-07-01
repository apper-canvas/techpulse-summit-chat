import ticketsData from '@/services/mockData/tickets.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const ticketService = {
  async getAll() {
    await delay(200)
    return [...ticketsData]
  },

  async submitBooking(bookingData) {
    await delay(1500) // Simulate processing time
    
    // Simulate occasional booking errors for demo
    if (Math.random() < 0.1) {
      throw new Error('Booking failed. Please try again.')
    }

    // Generate confirmation number
    const confirmationNumber = 'TP' + Date.now().toString().slice(-6)
    
    return {
      success: true,
      confirmationNumber,
      booking: {
        ...bookingData,
        Id: Date.now(),
        status: 'confirmed',
        bookedAt: new Date().toISOString()
      }
    }
  }
}