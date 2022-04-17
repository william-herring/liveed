import { NextPage } from "next"
import Head from 'next/head'
import prisma from "../../lib/prisma"
import { GetServerSideProps } from "next"
import Header from "../../components/Header"
import { useSession } from "next-auth/react"
import Post from "../../components/Post"
import { Feed } from "@prisma/client"
import { useState } from "react"
import TextEditor from "../../components/TextEditor"

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
    const { data: session } = useSession()
    const [editingPosts, setEditingPosts] = useState(0)

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
                    <img src={`https://ui-avatars.com/api/?name=${props.feed.author.username}&background=00437d&color=fff`} className='rounded-full' width={32} />
                    <p className='text-sm text-gray-500 ml-2'>{props.feed.author.username}</p>
                    <p className='text-gray-500 text-xs ml-auto'>Created on {props.feed.createdAt}</p>
                </div>
                <div className='flex items-center mb-1'>
                    <h1 className='font-bold text-4xl'>{props.feed.title}</h1>
                    {props.feed.live? <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full ml-auto'>LIVE</p> : null}
                </div>
                <p className='text-gray-500 text-sm'>{props.feed.posts.length} posts</p>
            </div>

            <div className='flex flex-col items-center mb-6'>
                <div className='w-5/6 md:w-1/2 space-y-6 bg'>
                    {[...Array(editingPosts)].map(() => <TextEditor feedId={props.feed.id} onDelete={() => setEditingPosts(editingPosts - 1)} />)}

                    {props.feed.posts.map((obj) => <Post title={obj.title} content={obj.content} />)}
                </div>
            </div>
            
            {session?.user?.name == props.feed.author.username? 
                <div className='flex justify-end fixed bottom-0 w-screen p-6'>
                    <button className='bg-red-500 p-3 rounded-full hover:bg-opacity-90' onClick={() => setEditingPosts(editingPosts + 1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#ffff"></path>
                            <path d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z" fill="#ffff"></path>
                        </svg>
                    </button>
                </div> : null
            }
        </div>
    )
}

export default FeedPage