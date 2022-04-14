import { GetServerSideProps, NextPage } from "next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Head from "next/head"

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: { providers: await getProviders() } }
}

const Login: NextPage<{ providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }> = (props) => {
    const { query } = useRouter()
    
    return (
        <div>
            <Head>
                <title>Log in</title>
            </Head>
            {Object.values(props.providers).map((provider) => {
                return <button onClick={() => signIn(provider.id, {
                    callbackUrl: query.callbackUrl?.toString(),
                  })}>Sign in with {provider.name}</button>
            })}
        </div>
    )
}

export default Login