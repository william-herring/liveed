import { NextPage } from "next"
import Head from 'next/head'
import prisma from "../../lib/prisma"
import { GetServerSideProps } from "next"
import Router from "next/router"
import Header from "../../components/Header"
import Post from "../../components/Post"
import { Feed } from "@prisma/client"

interface FeedProps extends Feed {
    author: { username: string }
    posts: { title: string, content: string }[]
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const feed = await prisma.feed.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
              select: { username: true },
            },
            posts: {
                select: { title: true, content: true },
            },
          },
    })

    // @ts-ignore
    feed.createdAt = feed.createdAt.toDateString()

    return { props: { feed } }
}

const FeedPage: NextPage<{ feed: FeedProps }> = (props) => {
    // const createdAt = new Date(props.feed.createdAt)
    
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

            <div className='flex flex-col mt-24 p-6 mb-10 border-b-2 pb-6'>
                <div className='flex items-center mb-3'>
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>{props.feed.author.username}</p>
                    <p className='text-gray-500 text-xs ml-auto'>Created on {props.feed.createdAt}</p>
                </div>
                <div className='flex items-center mb-1'>
                    <h1 className='font-bold text-4xl'>{props.feed.title}</h1>
                    {props.feed.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <p className='text-gray-500 text-sm'>{props.feed.posts.length} posts</p>
            </div>

            <div className='flex flex-col items-center'>
                <div className='w-5/6 md:w-1/2 space-y-6 bg'>
                    {props.feed.posts.map((obj) => {
                        return (
                            <Post title={obj.title} content={obj.content} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeedPage