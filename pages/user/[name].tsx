import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { User } from "@prisma/client"
import Header from "../../components/Header"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const user = await prisma.user.findUnique({
        where: {
            username: String(params?.name),
        }
    })

     // @ts-ignore
    user.createdAt = user.createdAt.toDateString()

    return { props: { user } }
}

const Account: NextPage<{ user: User }> = (props) => {
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

            <div className='mt-24'>
                <div className='flex space-x-6 p-6 items-center'>
                    <img className='rounded-full' width='128'
                    src={`https://ui-avatars.com/api/?name=${props.user.username}&background=00437d&color=fff`} />
                    <h1 className='font-bold text-4xl text-gray-600'>{props.user.username}</h1>
                </div>
            </div>
        </div>
    )
}

export default Account