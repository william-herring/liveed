import  {GetStaticProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import FeedCard from "../components/FeedCard";
import React from "react";
import { Feed } from "@prisma/client";

interface TrendingFeedProps extends Feed {
    subscribers: {
        id: number,
    }[],
    author: {
        username: string
    },
    posts: {
        id: number,
    }[]
}

export const getStaticProps: GetStaticProps = async () => {
    const feeds = await prisma.feed.findMany({
        orderBy: [
            { subscribers: { _count: 'desc' } }
        ],
        where: { live: true, createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            } },
        include: {
            author: {
                select: { username: true },
            },
            subscribers: {
                select: { id: true },
            },
            posts: {
                select: { id: true },
            }
        },
    });

    feeds.map(feed => {
        // @ts-ignore
        feed.createdAt = feed.createdAt.toDateString()
        return feed
    })

    return { props: { feeds } };
}

const TrendingPage: NextPage<{ feeds: TrendingFeedProps[] }> = (props) => {
    const { data: session } = useSession()
    return (
        <div className='bg-trending bg-fixed bg-repeat bg-contain'>
            <Head>
                <title>Liveed – Trending</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: false },
                { title: 'Trending', url: '/trending', active: true },
                { title: 'Watchlist', url: '/watchlist', active: false }
            ]} title='Home' />

            <div className='flex flex-col items-center pt-24 space-y-4'>
                <div className='text-red-500 p-6 text-center'>
                    <h1 className='font-extrabold text-4xl'>Welcome to the Trending page</h1>
                    <p className='text-gray-500 mt-2'>Here are the top feeds for today</p>
                </div>
                {props.feeds.map((obj) => {
                    return <FeedCard key={obj.id} id={obj.id} title={obj.title} posts={obj.posts.length} subscriptions={obj.subscribers.length}
                                     author={obj.author.username} live={obj.live} />
                })}
            </div>
        </div>
    )
}

export default TrendingPage