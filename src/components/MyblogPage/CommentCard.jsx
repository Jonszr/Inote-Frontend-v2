import React from 'react'

export default function
    () {
    return (
        <div className='w-full px-8 py-4'>
            <article>
                <div className="flex items-center mb-4 space-x-4">
                    <img className="w-10 h-10 rounded-full object-cover" src={require('../../assets/imgcard.jpg')} alt=""/>
                        <div className="space-y-1 font-medium dark:text-white">
                            <p>Jese Leos <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
                        </div>
                </div>
                
                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
                <p className="mb-2 font-light text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
                <p className="mb-3 font-light text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
                
            </article>
        </div>
    )
}
