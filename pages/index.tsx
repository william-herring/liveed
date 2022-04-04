import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Liveed</title>
      </Head>

      <nav>
        <div className='hidden md:block'>
          <div className='flex flex-row w-screen fixed p-4 shadow-lg items-center space-x-6 text-center text-gray-500'>
            <a href='/' className='flex flex-row space-x-3 items-center mr-3'>
              <Image src='/icon.png' width={36} height={36} /> <h1 className='font-bold text-md text-red-500'>Liveed</h1>
            </a>

            <a href='/' className='text-red-500'>Home</a>
            <a href='/trending' className='font-light'>Trending</a>
            <a href='/for-you' className='font-light'>For you</a>

            <input type="text" placeholder='Search...' className='p-2 ring-2 ring-gray-200 rounded-xl hover:ring-4' />
          </div>
        </div>
        <div className='md:hidden'>
          <div className='flex flex-row w-screen fixed p-4 shadow-lg items-center text-center'>
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
    </div>
  )
}

export default Home
