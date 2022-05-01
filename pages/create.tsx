import { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import Header from "../components/Header"

const CreateFeed: NextPage = () => {
    const [title, setTitle] = useState('New feed')

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: true },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'Watchlist', url: '/watchlist', active: false }
            ]} title={title} />

            <div className='flex flex-col items-center mt-24 p-6'>
                <input className='focus:outline-none font-semibold mb-3 w-full' placeholder='Title' type='text' onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
    )
}

export default CreateFeed