"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
 
/*const TRIP_DATA={
          "destination": "Pune",
      "duration": "3 days",
        "origin": "Mumbai",
        "budget": "Moderate",
       "group_size": "1",
       "hotels": [
            {
                "hotel_name": "The Pride Hotel Pune",
                "hotel_address": "5, University Road, Shivaji Nagar, Pune, Maharashtra 411005, India",
                "price_per_night": "₹4,500 - ₹6,000",
                "hotel_image_url": "https://example.com/pridehotelpune.jpg",
                "geo_coordinates": {
                    "latitude": 18.5328,
                    "longitude": 73.8571
                },
                "rating": 4.5,
                "description": "A luxurious hotel with modern amenities and excellent service."
            },
            {
                "hotel_name": "Hyatt Regency Pune & Residences",
                "hotel_address": "Weikfield IT Park, Nagar Road, Pune, Maharashtra 411014, India",
                "price_per_night": "₹5,000 - ₹7,000",
                "hotel_image_url": "https://example.com/hyattregencypune.jpg",
                "geo_coordinates": {
                    "latitude": 18.5552,
                    "longitude": 73.9184
                },
                "rating": 4.6,
                "description": "A contemporary hotel with spacious rooms and a range of facilities."
            },
            {
                "hotel_name": "JW Marriott Hotel Pune",
                "hotel_address": "Senapati Bapat Road, Pune, Maharashtra 411053, India",
                "price_per_night": "₹6,000 - ₹8,000",
                "hotel_image_url": "https://example.com/jwmarriottpune.jpg",
                "geo_coordinates": {
                    "latitude": 18.5343,
                    "longitude": 73.8386
                },
                "rating": 4.7,
                "description": "An upscale hotel offering luxurious accommodations and dining options."
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Arrival in Pune and local sightseeing",
                "best_time_to_visit_day": "Morning to Evening",
                "activities": [
                    {
                        "place_name": "Aga Khan Palace",
                        "place_details": "A historical landmark with significant importance in India's independence movement.",
                        "place_image_url": "https://example.com/agakhanpalace.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5431,
                            "longitude": 73.8981
                        },
                        "place_address": "Pune Nagar Road, Yerwada, Pune, Maharashtra 411006, India",
                        "ticket_pricing": "₹15 for Indians, ₹200 for foreigners",
                        "time_travel_each_location": "2-3 hours",
                        "best_time_to_visit": "10:00 AM - 5:00 PM"
                    },
                    {
                        "place_name": "Shaniwar Wada",
                        "place_details": "A historic fort that was once the seat of the Peshwa rulers.",
                        "place_image_url": "https://example.com/shaniwarwada.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5205,
                            "longitude": 73.8567
                        },
                        "place_address": "Shaniwar Peth, Pune, Maharashtra 411030, India",
                        "ticket_pricing": "₹5 for Indians, ₹125 for foreigners",
                        "time_travel_each_location": "2-3 hours",
                        "best_time_to_visit": "8:00 AM - 6:30 PM"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Exploring cultural and religious sites",
                "best_time_to_visit_day": "Morning to Evening",
                "activities": [
                    {
                        "place_name": "Dagdusheth Halwai Ganpati Temple",
                        "place_details": "A famous temple dedicated to Lord Ganesha, known for its beautiful idol.",
                        "place_image_url": "https://example.com/dagdusheth.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5158,
                            "longitude": 73.8563
                        },
                        "place_address": "Budhwar Peth, Pune, Maharashtra 411002, India",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "1-2 hours",
                        "best_time_to_visit": "6:00 AM - 10:00 PM"
                    },
                    {
                        "place_name": "Raja Dinkar Kelkar Museum",
                        "place_details": "A museum housing a vast collection of Indian artifacts and art.",
                        "place_image_url": "https://example.com/kelkarmuseum.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5167,
                            "longitude": 73.8514
                        },
                        "place_address": "1377/78, Natu Bagh, Shukrawar Peth, Pune, Maharashtra 411002, India",
                        "ticket_pricing": "₹50 for Indians, ₹200 for foreigners",
                        "time_travel_each_location": "2-3 hours",
                        "best_time_to_visit": "10:00 AM - 5:30 PM"
                    }
                ]
            },
            {
                "day": 3,
                "day_plan": "Visit Sinhagad Fort and return to Mumbai",
                "best_time_to_visit_day": "Morning to Afternoon",
                "activities": [
                    {
                        "place_name": "Sinhagad Fort",
                        "place_details": "A historic fort located on a hill, offering scenic views and a glimpse into Maratha history.",
                        "place_image_url": "https://example.com/sinhagad.jpg",
                        "geo_coordinates": {
                        "latitude": 18.3667,
                        "longitude": 73.75
                    },
                    "place_address": "Sinhagad Ghat Road, Pune, Maharashtra 411025, India",
                    "ticket_pricing": "₹20",
                    "time_travel_each_location": "4-5 hours",
                    "best_time_to_visit": "9:00 AM - 6:00 PM"
                }
            ]
        }
   ]
}*/

function Itinerary() {
  //@ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
  const[tripData, setTripData]=useState<TripInfo|null>(null)
 
  useEffect(()=>{
    tripDetailInfo&&setTripData(tripDetailInfo)
  },[tripDetailInfo])

  const data = tripData?[
    {
      title: "Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {tripData?.hotels.map((hotel, index)=>(
              <HotelCardItem hotel={hotel}/>
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData)=>({
        title: `Day ${dayData?.day}`,
        content: (
            <div>
                <p className='mb-2 font-bold text-xl text-primary'>Best Time :{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity, index)=>(
                    <PlaceCardItem activity={activity}/>
                ))}
                </div>
            </div>
        )
    }))
  ]:[];

  return (
    <div className="relative w-full h-[80vh] overflow-auto">
      {/* @ts-ignore */}
     {tripData ? <Timeline data={data} tripData={tripData} />
     :
     <div>
        <h2 className='flex gap-2 text-3xl  text-white left-25 items-center absolute bottom-10'><ArrowLeft/>Getting to Know You to build perfect trip here...</h2>
       <Image src={'/travel.png'} alt='travel' width={800} height={800} className='w-full h-full object-cover rounded-3xl'/>
     </div>
     }
    </div>
  );
}

export default Itinerary
