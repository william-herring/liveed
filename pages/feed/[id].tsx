import { NextPage } from "next"
import Head from 'next/head'
import prisma from "../../lib/prisma"
import { GetServerSideProps } from "next"
import Router from "next/router"
import { Feed } from "@prisma/client"
import Header from "../../components/Header"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const feed = await prisma.feed.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
              select: { username: true },
            },
          },
    })

    // @ts-ignore
    feed.createdAt = Math.floor(feed.createdAt / 1000)

    return { props: { feed } }
}

const Feed: NextPage<{feed: Feed}> = (props) => {
    return (
        <div>
            <Head>
                <title>{props.feed.title}</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: true },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'For you', url: '/for-you', active: false }
            ]} />

            <div className='flex flex-col mt-24 p-6'>
                <div className='flex items-center mb-3'>
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>Daniel Placeholder</p>
                </div>
                <div className='flex items-center mb-3 border-b-2 pb-6'>
                    <h1 className='font-bold text-4xl'>{props.feed.title}</h1>
                    {props.feed.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Feed