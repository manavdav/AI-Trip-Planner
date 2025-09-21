"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Activity } from './ChatBox'
import axios from 'axios'

type Props={
    activity:Activity
}
function PlaceCardItem({activity}:Props) {
   
  return (
    <div>
      <div className='relative w-full h-48'>
        <Image src={'/placeholder.jpg'} 
           alt={activity.place_name}
           width={250} height={200}
           className='object-cover'
         />
      </div>
        <h2 className='font-semibold text-sm'>{activity?.place_name}</h2>
        <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
        <h2 className='flex gap-2 text-blue-500 line-clamp-1'><Ticket/>{activity?.ticket_pricing}</h2>
        <p className='flex text-primary gap-2 line-clamp-1'><Clock/>{activity?.best_time_to_visit}</p>
        <Link href={'https://www.google.com/maps/search/?api=1&query='+activity?.place_name} target='_blank'>
            <Button size={'sm'} variant={'outline'} className='w-full mt-2'>View<ExternalLink/></Button>
        </Link>
    </div>
  )
}

export default PlaceCardItem
