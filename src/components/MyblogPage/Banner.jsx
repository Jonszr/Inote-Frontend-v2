import React from 'react'

export default function Banner({data}) {
  return (
    <div className=' p-8 rounded-lg bg-white border shadow-lg shadow-indigo-600 mt-10'>
        <h1 className='text-lg font-bold'>About:</h1>
        <p className=' break-words  h-auto'>
        {data.about? data.about:"Intoduce about youself to everyone!"}
        </p>
        
    </div>
  )
}
