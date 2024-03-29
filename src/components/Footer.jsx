import React from 'react'

export default function footer() {
  return (
    <footer className="p-4 bg-zinc-900  shadow md:px-6 md:py-8 ">
    <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com" className="flex items-center mb-4 sm:mb-0">
            <h1 className='text-3xl text-white font-bold mr-4 sm:text-4xl'>INOTE.</h1>
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">INOTE.</span> */}
        </a>
        {/* <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                About
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                Privacy Policy
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                Licensing
                <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                Contact
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul> */}
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com" className="hover:underline">Zhenrong Shi</a>. All Rights Reserved.
    </span>
</footer>
  )
}
