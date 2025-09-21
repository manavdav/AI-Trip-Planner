import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}: any) {
  return (
    <div className='mt-3'>
      <h2 className='font-bold text-xl text-center'>Start Planning new <strong className='text-primary'>Trip</strong> using Ai</h2>
      <p className='text-sm text-center text-gray-400 mt-2'>Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of Ai. Let our smart assistant do the hard work while you enjoy the journey.</p>
      <div className='mt-3 flex flex-col gap-5'>
            {suggestions.map((suggestions, index)=>(
                 <div key={index} 
                 onClick={()=>onSelectOption(suggestions.title)}
                 className='flex items-center gap-2 border rounded-xl p-2 cursor-pointer hover:border-primary hover:text-primary hover:shadow-lg'>
                      {suggestions.icon}
                      <h2 className='text-lg'>{suggestions.title}</h2>
                 </div>
            ))}
      </div>
    </div>
  )
}

export default EmptyBoxState
