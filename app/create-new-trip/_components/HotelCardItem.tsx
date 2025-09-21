"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Hotel } from './ChatBox'
import { Star, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'

type Props={
    hotel:Hotel
}
function HotelCardItem({hotel}:Props) {
 
  return (
    <div>
       <div className='flex flex-col gap-1'>
            <Image src={'/placeholder.jpg'} 
            alt={hotel?.hotel_name || 'Hotel Image'} 
            width={300} height={200}
            className='rounded-xl shadow object-cover mb-2'
            /> {/*Image Dimensions adjust later*/}
            <h2 className='font-semibold text-sm'>{hotel?.hotel_name}</h2>
            <h2 className='text-gray-500'>{hotel.hotel_address}</h2>
                <div className='flex justify-between items-center'>
                    <p className='flex gap-1 text-green-600'><Wallet/>{hotel.price_per_night}</p>
                     <p className='text-yellow-500 flex gap-1'><Star/>{hotel.rating}</p>
                </div>
            <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name} target='_blank'>
                <Button variant={'outline'} className='mt-1 w-full'>View</Button>
            </Link>
            {/*<p className='line-clamp-2 text-gray-500'>{hotel?.description}</p>*/}
        </div>
    </div>
  )
}

export default HotelCardItem
