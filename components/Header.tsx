import React, { useState } from "react"
import Image from 'next/image'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

interface HeaderProps {
    links: { title: string, url: string, active: boolean }[],
    title: string,
}

const Header: React.FC<HeaderProps> = (props) => {
    const { data: session } = useSession()
    const [showDrawer, setShowDrawer] = useState(false)

    return (
        <nav className="fixed top-0 bg-white">
          {showDrawer? <div className='flex flex-col w-screen h-screen bg-white p-4'>
            <button onClick={() => setShowDrawer(false)} className='ml-auto'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z" fill="#ef4444" />
              </svg>
            </button>

            {props.links.map((obj) => <a href={obj.url} className={obj.active? 'text-red-500 ml-6 font-bold text-2xl' : 'ml-6 text-2xl'}>{obj.title}</a>)}
          </div> : null}
          <div className='hidden md:block'>
            <div className='flex flex-row w-screen p-4 shadow-lg items-center text-center text-gray-500'>
              <a href='/' className='flex flex-row space-x-3 items-center mr-3'>
                <Image src='/icon.png' width={36} height={36} /> <h1 className='font-bold text-md text-red-500'>Liveed</h1>
              </a>

              {props.links.map((obj) => {
                  return <a href={obj.url} className={obj.active? 'text-red-500 ml-6' : 'font-light ml-6'}>{obj.title}</a>
              })}

              <input type="text" placeholder='Search...' className='p-2 ml-6 ring-2 ring-gray-200 rounded-xl hover:ring-4' />

              <div className='ml-auto mr-2'>{session? 
                <a href={`/user/${session.user?.name}`}>{session.user?.name}</a> : 
                <button onClick={() => signIn()}>Log in</button>}
              </div>
            </div>
          </div>
          <div className='md:hidden'>
            <div className='flex flex-row w-screen p-4 shadow-lg items-center text-center'>
              <a href='/'>
                <Image src='/icon.png' width={36} height={36} />
              </a>

              <h1 className='font-bold text-lg text-red-500 flex-1'>{props.title}</h1>

              <button className='ml-auto' onClick={() => setShowDrawer(true)}>
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