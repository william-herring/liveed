import { useRouter } from "next/router"
import { GetServerSideProps, NextPage } from "next"
import { useSession, getSession } from "next-auth/react"
import { User } from "@prisma/client"
import prisma from "../lib/prisma"

interface AccountRedirectProps {
    user: {
        email: string,
        username: string
    }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session) return { props: { } }
    
    var user = await prisma.user.findUnique({
        where: {
            username: session?.user?.name?.toString()
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: session?.user?.email as string,
                username: session?.user?.name as string,
            }
        })
    }

    return { props: { user: { email: user.email, username: user.username } } }
}

const AccountRedirect: NextPage<AccountRedirectProps | null> = (props) => {
    const { data: session } = useSession()
    const { redirectUrl } = useRouter().query

    console.log(props.user)

    return (
        <div>
            {!session? <p>Did you mean to go to the <a href='/login' className='text-red-500'>log in page</a>?</p> : <p>Username: {props.user?.username}, email: {props.user?.username}</p>}
        </div>
    )
}

export default AccountRedirect