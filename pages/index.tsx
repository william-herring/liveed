import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import prisma from '../lib/prisma'
import Head from 'next/head'
import Header from '../components/Header'
import { Feed } from '@prisma/client'
import FeedCard from '../components/FeedCard'

interface HomeFeedProps extends Feed {
  author: {
    username: string
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const feeds = await prisma.feed.findMany({
    where: { live: true },
    include: {
      author: { 
        select: { username: true }
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
  return (
    <div>
      <Head>
        <title>Liveed</title>
      </Head>

      <Header links={[
        { title: 'Home', url: '/', active: true },
        { title: 'Trending', url: '/trending', active: false },
        { title: 'For you', url: '/for-you', active: false }
      ]} />

      <div className='flex flex-col items-center mt-24 space-y-4'>
        {props.feeds.map((obj) => {
          return <FeedCard key={obj.id} id={obj.id} title={obj.title} author={obj.author.username} live={obj.live} />
        })}
      </div>
    </div>
  )
}

export default Home
