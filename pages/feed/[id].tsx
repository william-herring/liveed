import { NextPage } from "next"
import Head from 'next/head'
import prisma from "../../lib/prisma"
import { GetServerSideProps } from "next"
import Header from "../../components/Header"
import { useSession } from "next-auth/react"
import Post from "../../components/Post"
import { Feed } from "@prisma/client"
import React, { useState } from "react"
import TextEditor from "../../components/TextEditor"
import {useRouter} from "next/router";

interface FeedProps extends Feed {
    author: { username: string }
    subscribers: { username: string }[]
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
            subscribers: {
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
    const { data: session } = useSession()
    const [editingPosts, setEditingPosts] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const router = useRouter()

    const subscribeToFeed = async () => {
        const res = await fetch(`../api/feed/subscribe?id=${props.feed.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

    const unsubscribeFromFeed = async () => {
        const res = await fetch(`../api/feed/unsubscribe?id=${props.feed.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

    return (
        <div>
            <Head>
                <title>{props.feed.title}</title>
            </Head>

            {openPopup? <button onClick={() => setOpenPopup(false)} className='flex cursor-default flex-col bg-black fixed top-0 bg-opacity-20 z-20 w-screen h-screen justify-center items-center'>
                <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <div className='text-red-500 font-light text-right w-full mb-3'>
                        <button>Close</button>
                    </div>
                    <h1 className='font-semibold text-xl'>Subscribers to this feed ({props.feed.subscribers.length})</h1>
                    {props.feed.subscribers.map((s) => <a className='flex my-4 items-center' href={`/user/${s.username}`}>
                        <img src={`https://ui-avatars.com/api/?name=${s.username}&background=00437d&color=fff`} className='rounded-full' width={32} />
                        <p className='text-sm text-gray-500 ml-2'>{s.username}</p>
                    </a>)}
                </div>
            </button> : null}

            <Header links={[
                { title: 'Home', url: '/', active: false },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'Watchlist', url: '/watchlist', active: false }
            ]} title={props.feed.title} />

            <div className='flex flex-col mt-24 p-6 mb-10 border-b-2 pb-6'>
                <div className='flex mb-3'>
                    <a className='flex items-center' href={`/user/${props.feed.author.username}`}>
                        <img src={`https://ui-avatars.com/api/?name=${props.feed.author.username}&background=00437d&color=fff`} className='rounded-full' width={32} />
                        <p className='text-sm text-gray-500 ml-2'>{props.feed.author.username}</p>
                    </a>
                    <p className='text-gray-500 text-xs ml-auto'>Created on {props.feed.createdAt}</p>
                </div>
                <div className='flex items-center mb-1'>
                    <h1 className='font-bold text-4xl'>{props.feed.title}</h1>
                    {props.feed.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <div className='flex flex-wrap space-x-2 my-1.5 w-full'>
                    {props.feed.tags.map((t) => <p className='bg-blue-300 text-blue-900 text-xs rounded-full p-1.5 text-center mb-1.5' key={t}>#{t}
                    </p>)}
                </div>
                <p className='text-sm mr-auto space-x-5'><button className='text-gray-500' onClick={() => setOpenPopup(true)}>{props.feed.subscribers.length} subscribers</button>
                    {session?.user?.name == undefined? null : !props.feed.subscribers.some(u => u.username === session?.user?.name)? <button className='text-red-500 font-semibold' onClick={subscribeToFeed}>Subscribe</button> : <button className='text-gray-500 font-semibold' onClick={unsubscribeFromFeed}>Unsubscribe</button>} </p>
                <p className='text-gray-500 text-sm'>{props.feed.posts.length} posts</p>
            </div>

            <div className='flex flex-col items-center mb-6'>
                <div className='w-5/6 md:w-1/2 space-y-6 bg'>
                    {[...Array(editingPosts)].map(() => <TextEditor feedId={props.feed.id} onDelete={() => setEditingPosts(editingPosts - 1)} />)}

                    {props.feed.posts.reverse().map((obj) => <Post title={obj.title} content={obj.content} />)}
                </div>
            </div>

            {session?.user?.name == props.feed.author.username?
                <div className='flex justify-end fixed bottom-0 w-screen p-6'>
                    <button className='bg-red-500 p-3 rounded-full hover:bg-opacity-90' onClick={() => setEditingPosts(editingPosts + 1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#ffff"/>
                            <path d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z" fill="#ffff"/>
                        </svg>
                    </button>
                </div> : null
            }
        </div>
    )
}

export default FeedPage