import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import SectionHeader from '@/components/molecules/SectionHeader'
import Card from '@/components/atoms/Card'
const VenueSection = () => {
  const handleOpenMaps = () => {
    try {
      const address = "747 Howard Street, San Francisco, CA 94103"
      const encodedAddress = encodeURIComponent(address)
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      
      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
      toast.success('Opening maps application...')
    } catch (error) {
      toast.error('Unable to open maps. Please try again.')
    }
  }

  const venueFeatures = [
    {
      icon: 'MapPin',
      title: 'Prime Location',
      description: 'Located in the heart of San Francisco\'s SOMA district, easily accessible by public transport and rideshare.'
    },
    {
      icon: 'Wifi',
      title: 'High-Speed WiFi',
      description: 'Enterprise-grade WiFi infrastructure ensuring seamless connectivity for all attendees throughout the venue.'
    },
    {
      icon: 'Car',
      title: 'Parking Available',
      description: 'On-site parking garage with reserved spaces for attendees. Valet service available for Enterprise ticket holders.'
    },
    {
      icon: 'Coffee',
      title: 'Food & Beverage',
      description: 'Multiple dining options, coffee stations, and networking lounges with premium catering throughout the event.'
    }
  ]
  const directions = [
    {
      icon: 'Plane',
      title: 'From SFO Airport',
      description: '30-minute drive or BART to Montgomery Station + 10-minute walk'
    },
    {
      icon: 'Train',
      title: 'Public Transit',
      description: 'BART: Montgomery/Powell Stations. Muni: Multiple bus lines serve the area'
    },
    {
      icon: 'Car',
      title: 'Driving',
      description: 'Take I-80 to 4th Street exit. Valet parking available at venue entrance'
    }
  ]

  return (
    <section id="venue" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Venue & Location"
          subtitle="Join us at the iconic Moscone Center in San Francisco - a world-class venue in the heart of the tech capital."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Venue Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full" gradient>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold font-display text-white mb-2">Moscone Center</h3>
                <p className="text-slate-300 text-lg">San Francisco, California</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="MapPin" size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Address</p>
                    <p className="text-slate-300">747 Howard Street<br />San Francisco, CA 94103</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Clock" size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Event Hours</p>
                    <p className="text-slate-300">
                      March 15-16, 2024<br />
                      9:00 AM - 6:00 PM daily
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-secondary/80 to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Phone" size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Contact</p>
                    <p className="text-slate-300">
                      info@techpulsesummit.com<br />
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">200k+</div>
                  <div className="text-slate-400 text-sm">Sq Feet</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">6</div>
                  <div className="text-slate-400 text-sm">Halls</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-0 overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="MapPin" size={24} className="text-white" />
                  </div>
<h4 className="text-xl font-bold text-white mb-2">Interactive Map</h4>
                  <p className="text-slate-300 mb-4">Click to view directions and explore the area</p>
                  <button className="btn-primary" onClick={handleOpenMaps}>
                    <ApperIcon name="ExternalLink" size={16} />
                    Open in Maps
                  </button>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:1s]"></div>
                <div className="absolute top-12 right-12 w-4 h-4 bg-secondary rounded-full animate-pulse [animation-delay:2s]"></div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Venue Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Venue Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-300 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Getting There */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-dark rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Getting There</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {directions.map((direction, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={direction.icon} size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{direction.title}</h4>
                  <p className="text-slate-300">{direction.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Accommodation */}
            <div className="border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-white text-center mb-6">Recommended Hotels</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  { name: 'St. Regis San Francisco', distance: '0.3 miles', rate: 'From $450/night' },
                  { name: 'W San Francisco', distance: '0.5 miles', rate: 'From $320/night' },
                  { name: 'Hotel Zephyr', distance: '1.2 miles', rate: 'From $280/night' }
                ].map((hotel, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-1">{hotel.name}</h5>
                    <p className="text-sm text-slate-400">{hotel.distance} • {hotel.rate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VenueSection