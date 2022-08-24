import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import React, { useState } from "react"
import { useRouter } from "next/router";
import Header from "../components/Header"

const CreateFeed: NextPage = () => {
    const [title, setTitle] = useState('New feed')
    const [tags, setTags] = useState<string[]>([])
    const { data: session } = useSession()
    const router = useRouter()

    const handleTagEnter = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!title) {
            alert('Please fill in all fields')
            return
        }

        const data = {
            title: title,
            tags: tags,
        }

        const res = await fetch('../api/create-feed', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (res.status != 200) {
            alert('Something went wrong')
            return
        }
        const obj = await res.json()
        await router.replace('/feed/' + obj['id'])
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header links={[
                { title: 'Home', url: '/', active: false },
                { title: 'Trending', url: '/trending', active: false },
                { title: 'Watchlist', url: '/watchlist', active: false }
            ]} title='Create Feed' />

            <div className='mt-24 p-6 m-10 border-2 rounded-lg'>
                <div className='flex mb-3'>
                    <a className='flex items-center' href={`/user/${session?.user?.name}`}>
                        <img src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=00437d&color=fff`} className='rounded-full' width={32} />
                        <p className='text-sm text-gray-500 ml-2'>{session?.user?.name}</p>
                    </a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center mb-1'>
                        <input className='focus:outline-none font-semibold mb-3 w-full text-4xl' placeholder='Title' type='text' onChange={(e) => setTitle(e.target.value)} />
                        <p className='bg-red-500 text-white px-2 rounded-r-full rounded-l-full'>LIVE</p>
                    </div>
                    <input className='focus:outline-none mb-3 w-full text-lg' placeholder='Enter tags' type='text' onKeyDown={handleTagEnter} />
                    <div className='flex flex-wrap space-x-2 mb-6 w-full'>
                        {tags.map((t) => <p className='bg-blue-300 text-blue-900 text-sm rounded-full p-1.5 text-center mb-1.5' key={t}>#{t}
                        </p>)}
                    </div>
                        <button type='submit' className='bg-red-500 text-sm text-white font-semibold p-2 rounded-full hover:bg-opacity-90'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateFeed