import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { ticketService } from '@/services/api/ticketService'
import SectionHeader from '@/components/molecules/SectionHeader'
import TicketCard from '@/components/molecules/TicketCard'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'

const TicketsSection = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTicket, setSelectedTicket] = useState('')
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    company: '',
    specialRequests: ''
  })

  const loadTickets = async () => {
    try {
      setLoading(true)
      setError('')
      const ticketsData = await ticketService.getAll()
      setTickets(ticketsData)
    } catch (err) {
      setError(err.message || 'Failed to load ticket information')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const handleTicketSelect = (tierName) => {
    if (selectedTicket === tierName) {
      setSelectedTicket('')
      setShowBookingForm(false)
    } else {
      setSelectedTicket(tierName)
      setTicketQuantity(1)
      setShowBookingForm(true)
    }
  }

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getSelectedTicketDetails = () => {
    return tickets.find(ticket => ticket.tier === selectedTicket)
  }

  const calculateTotal = () => {
    const ticket = getSelectedTicketDetails()
    return ticket ? ticket.price * ticketQuantity : 0
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedTicket) {
      toast.error('Please select a ticket tier')
      return
    }

    if (!bookingData.name || !bookingData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setBookingLoading(true)
      
      const booking = {
        ticketTier: selectedTicket,
        quantity: ticketQuantity,
        name: bookingData.name,
        email: bookingData.email,
        company: bookingData.company,
        specialRequests: bookingData.specialRequests,
        total: calculateTotal()
      }

      const result = await ticketService.submitBooking(booking)
      
      toast.success(`Booking confirmed! Confirmation #${result.confirmationNumber}`)
      
      // Reset form
      setSelectedTicket('')
      setTicketQuantity(1)
      setShowBookingForm(false)
      setBookingData({
        name: '',
        email: '',
        company: '',
        specialRequests: ''
      })
      
    } catch (err) {
      toast.error(err.message || 'Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="tickets" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Tickets"
            subtitle="Choose your summit experience and secure your spot at the premier tech conference of 2024."
          />
          <Loading />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="tickets" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Tickets"
            subtitle="Choose your summit experience and secure your spot at the premier tech conference of 2024."
          />
          <Error message={error} onRetry={loadTickets} />
        </div>
      </section>
    )
  }

  if (tickets.length === 0) {
    return (
      <section id="tickets" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Conference Tickets"
            subtitle="Choose your summit experience and secure your spot at the premier tech conference of 2024."
          />
          <Empty
            title="Tickets Coming Soon"
            description="Ticket sales will open soon! Sign up for notifications to be the first to know."
            icon="Ticket"
          />
        </div>
      </section>
    )
  }

  return (
    <section id="tickets" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Conference Tickets"
          subtitle="Choose your summit experience and secure your spot at the premier tech conference of 2024. All tickets include access to sessions, networking events, and conference materials."
        />

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TicketCard
                ticket={ticket}
                isSelected={selectedTicket === ticket.tier}
                onSelect={handleTicketSelect}
                quantity={selectedTicket === ticket.tier ? ticketQuantity : 1}
                onQuantityChange={setTicketQuantity}
              />
            </motion.div>
          ))}
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Complete Your Booking</h3>
                <p className="text-slate-300">
                  {selectedTicket} Ticket × {ticketQuantity} = 
                  <span className="text-accent font-bold ml-2">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name *"
                    icon="User"
                    value={bookingData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    icon="Mail"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <Input
                  label="Company"
                  icon="Building"
                  value={bookingData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company name (optional)"
                />

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Dietary restrictions, accessibility needs, etc."
                    rows={3}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="bg-gradient-dark rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Ticket Type:</span>
                      <span className="text-white">{selectedTicket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Quantity:</span>
                      <span className="text-white">{ticketQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Price per ticket:</span>
                      <span className="text-white">${getSelectedTicketDetails()?.price}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total:</span>
                        <span className="text-accent">${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowBookingForm(false)
                      setSelectedTicket('')
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={bookingLoading}
                    className="flex-1"
                    icon="CreditCard"
                  >
                    {bookingLoading ? 'Processing...' : 'Complete Booking'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Ticket Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-dark rounded-2xl p-8 max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-6">What's Included</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              {[
                { icon: 'Calendar', text: 'All conference sessions' },
                { icon: 'Coffee', text: 'Meals & refreshments' },
                { icon: 'Users', text: 'Networking events' },
                { icon: 'Download', text: 'Digital resources' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <ApperIcon name={item.icon} size={16} className="text-white" />
                  </div>
                  <span className="text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TicketsSection