import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Competitions from '../components/Competitions';
import About from '../components/About';
import Schedule from '../components/Schedule';
import Eligibility from '../components/Eligibility';
import Domains from '../components/Domains';
import HowItWorks from '../components/HowItWorks';
import Evaluation from '../components/Evaluation';
import Rules from '../components/Rules';
import Prizes from '../components/Prizes';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import ContactVenue from '../components/ContactVenue';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Competitions />
      <About />
      <Schedule />
      <Eligibility />
      <Domains />
      <HowItWorks />
      <Evaluation />
      <Rules />
      <Prizes />
      <Team />
      <FAQ />
      <ContactVenue />
      <FinalCTA />
      <Footer />
    </>
  );
}
