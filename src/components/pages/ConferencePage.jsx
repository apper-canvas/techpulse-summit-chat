import React from 'react'
import Navigation from '@/components/molecules/Navigation'
import HeroSection from '@/components/organisms/HeroSection'
import AboutSection from '@/components/organisms/AboutSection'
import ScheduleSection from '@/components/organisms/ScheduleSection'
import SpeakersSection from '@/components/organisms/SpeakersSection'
import TicketsSection from '@/components/organisms/TicketsSection'
import VenueSection from '@/components/organisms/VenueSection'
import Footer from '@/components/organisms/Footer'

const ConferencePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <SpeakersSection />
        <TicketsSection />
        <VenueSection />
      </main>
      <Footer />
    </div>
  )
}

export default ConferencePage