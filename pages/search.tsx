import { GetServerSideProps, NextPage } from "next"
import Router, { useRouter } from "next/router"
import prisma from "../lib/prisma"
import Head from "next/head"
import Header from "../components/Header"
import { Feed, User } from "@prisma/client"

interface SearchProps {
    feeds: Feed[]
    users: User[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const search = query.q as string

    const feeds = await prisma.feed.findMany({
        where: { title: { contains: search } }
    })
    const users = await prisma.user.findMany({
        where: { username: { contains: search } }
    })

    feeds.map(feed => 
        // @ts-ignore
        feed.createdAt = feed.createdAt.toDateString()
    )
    users.map(user => 
        // @ts-ignore
        user.createdAt = user.createdAt.toDateString()
    )

    return { props: { feeds, users } }
}

const SearchPage: NextPage<SearchProps> = (props) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Search: {router.query.q}</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: false },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'Watchlist', url: '/watchlist', active: false }
            ]} title='Search' />

            <div className='p-6 mt-24'>
                <h1 className='text-2xl text-gray-500'>{props.feeds.length + props.users.length} results for "{router.query.q}"</h1>
                <div className='flex flex-col mt-6 font-light text-red-500'>
                    {props.users.map((u) => <a href={'/user/' + u.username}>User: {u.username}</a>)}
                    {props.feeds.map((f) => <a href={'/feed/' + f.id}>Feed: {f.title}</a>)}
                </div>
            </div>
        </div>
    )
}

export default SearchPage