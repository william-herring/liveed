import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
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
                    <div className='flex border-b-2 space-x-3 text-gray-500'>
                        <button className='border-2 ml-6 border-b-0 rounded-t-lg p-2 bg-red-500 text-white shadow-3xl'>Feeds</button>
                        <button className='border-2 border-b-0 rounded-t-lg p-2'>Posts</button>
                        <button className='border-2 border-b-0 rounded-t-lg p-2'>Watchlist</button>
                    </div>

                    {props.user.feeds.map((feed) => {
                        return <h3>{feed.title}</h3>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Account