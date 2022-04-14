import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { User } from "@prisma/client"
import Header from "../../components/Header"

interface UserPageProps extends User {
    feeds: {
        title: string
        posts: { id: number }[]
    }[]
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const user = await prisma.user.findUnique({
        where: {
            username: String(params?.name),
        },
        include: {
            feeds: {
                select: { title: true, posts: { select: { id: true } } }
            }
        }
    })

     // @ts-ignore
    user.createdAt = user.createdAt.toDateString()

    return { props: { user } }
}

const Account: NextPage<{ user: UserPageProps }> = (props) => {
    const { data: session } = useSession()
    const [ tab, setTab ] = useState(0)

    return (
        <div>
            <Head>
                <title>{props.user.username}</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: true },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'For you', url: '/for-you', active: false }
            ]} />

            <div>
                <div className='flex space-x-6 p-6 items-center pt-24 bg-gray-100'>
                    <img className='rounded-full' width='64'
                    src={`https://ui-avatars.com/api/?name=${props.user.username}&background=00437d&color=fff`} />
                    <h1 className='font-bold text-3xl text-gray-700'>{props.user.username}</h1>
                </div>

                <div className='border-t-2 flex p-2 mb-24 text-gray-500'>
                    <p className='text-sm'>User joined on {props.user.createdAt}</p>
                </div>

                {/* TODO: Add functionality */}
                <div>
                    <div className='flex pl-3 border-b-2 space-x-3 text-gray-500'>
                        {['Feeds', 'Posts', 'Watchlist'].map((value, i) => {
                            if (i != tab) {
                                return <button className='border-2 border-b-0 rounded-t-lg p-2' onClick={() => setTab(i)}>{value}</button>
                            }

                            return <button className='border-2 border-b-0 rounded-t-lg p-2 bg-gray-200' onClick={() => setTab(i)}>{value}</button>
                        })}
                    </div>

                    {props.user.feeds.map((feed) => {
                        return <h3>{feed.title}</h3>
                    })}
                </div>
                
                <div className='flex justify-center'>
                    {session?.user?.name == props.user.username? 
                    <button className='mt-24 text-red-500 font-bold' onClick={() => signOut()}>Sign out</button> : null}
                </div>
            </div>
        </div>
    )
}

export default Account