import type { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import prisma from '../lib/prisma'
import Head from 'next/head'
import Header from '../components/Header'
import { Feed } from '@prisma/client'
import FeedCard from '../components/FeedCard'
import { useSession } from 'next-auth/react'

interface HomeFeedProps extends Feed {
  hearts: number,
  author: {
    username: string
  },
  posts: {
    id: number,
  }[]
}

export const getStaticProps: GetStaticProps = async () => {
  const feeds = await prisma.feed.findMany({
    where: { live: true },
    include: {
      author: { 
        select: { username: true },
      },
      posts: {
        select: { id: true },
      }
    },
  });

  feeds.map(feed => {
    // Ignore any errors picked up by linter, this isn't optimal but it is the only working date serialization solution for now.

    // @ts-ignore
    feed.createdAt = feed.createdAt.toDateString()

    return feed
  })

  return { props: { feeds } };
}

const Home: NextPage<{ feeds: HomeFeedProps[] }> = (props) => {
const { data: session } = useSession()

  return (
    <div>
      <Head>
        <title>Liveed</title>
      </Head>

      <Header links={[
        { title: 'Home', url: '/', active: true },
        { title: 'Trending', url: '/trending', active: false },
        { title: 'Watchlist', url: '/watchlist', active: false }
      ]} title='Home' />

      <div className='flex flex-col items-center mt-24 space-y-4'>
        {props.feeds.map((obj) => {
          return <FeedCard key={obj.id} id={obj.id} title={obj.title} posts={obj.posts.length} hearts={obj.hearts}
          author={obj.author.username} live={obj.live} />
        })}
      </div>

      {session? <div className='flex justify-end fixed bottom-0 w-screen p-6'>
          <a className='bg-red-500 p-3 rounded-full hover:bg-opacity-90' href='/create'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#ffff"></path>
                  <path d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z" fill="#ffff"></path>
              </svg>
          </a>
      </div> : null}
    </div>
  )
}

export default Home
