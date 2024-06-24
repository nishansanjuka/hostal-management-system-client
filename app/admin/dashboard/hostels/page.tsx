import { Hostels, NavHeader } from '@/components/pages/admin/hostels'
import React from 'react'

export default function HostelsPage() {
  return (
    <div className=' sm:max-w-[70vw] lg:max-w-full'>
      <NavHeader/>
      <Hostels/>
    </div>
  )
}