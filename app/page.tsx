import React from 'react'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className='w-full min-h-screen bg-black text-white relative'>
      <Hero />
      <Showcase />
      <Footer />
    </main>
  )
}