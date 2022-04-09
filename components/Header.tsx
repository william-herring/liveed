import React from "react";
import Image from 'next/image'
import { useState } from "react";

interface HeaderProps {
    links: { title: string, url: string, active: boolean }[]
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <nav className="fixed top-0 bg-white">
          <div className='hidden md:block'>
            <div className='flex flex-row w-screen p-4 shadow-lg items-center space-x-6 text-center text-gray-500'>
              <a href='/' className='flex flex-row space-x-3 items-center mr-3'>
                <Image src='/icon.png' width={36} height={36} /> <h1 className='font-bold text-md text-red-500'>Liveed</h1>
              </a>

              {props.links.map((obj) => {
                  return <a href={obj.url} className={obj.active? 'text-red-500' : 'font-light'}>{obj.title}</a>
              })}

              <input type="text" placeholder='Search...' className='p-2 ring-2 ring-gray-200 rounded-xl hover:ring-4' />
            </div>
          </div>
          <div className='md:hidden'>
            <div className='flex flex-row w-screen p-4 shadow-lg items-center text-center'>
              <a href='/'>
                <Image src='/icon.png' width={36} height={36} />
              </a>

              <h1 className='font-bold text-lg text-red-500 flex-1'>Home</h1>

              <button className='ml-auto mr-0'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z" fill="#ef4444" />
                  </svg>
              </button>
            </div>
        </div>
      </nav>
    )
}

export default Header