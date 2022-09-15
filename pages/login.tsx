import { GetServerSideProps, NextPage } from "next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Head from "next/head"

const providerSvgMap: { [key: string]: JSX.Element } = {
    'google': <svg className='mr-2' width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.956 10.356V13.807H16.748C16.302 16 14.435 17.26 11.956 17.26C9.06851 17.2202 6.74862 14.8682 6.74862 11.9805C6.74862 9.09275 9.06851 6.74072 11.956 6.70098C13.1562 6.69954 14.3194 7.11605 15.246 7.87898L17.846 5.27898C14.8636 2.65705 10.508 2.31981 7.15752 4.45142C3.80707 6.58303 2.26698 10.6712 3.37821 14.4836C4.48943 18.296 7.98491 20.9164 11.956 20.914C16.423 20.914 20.485 17.665 20.485 11.98C20.4781 11.4326 20.411 10.8877 20.285 10.355L11.956 10.356Z" fill="#ef4444"></path>
    </svg>
}

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
            <div className='flex flex-col items-center justify-center h-screen text-center'>
                <h1 className='text-red-500 font-bold text-4xl m-6'>Continue to Liveed</h1>
                {Object.values(props.providers).map((provider) => {
                    return <div key={provider.name} className='flex border-2 flex-row text-red-500 text-xl p-3 rounded-lg'>
                        {providerSvgMap[provider.id]}
                            <button onClick={() => signIn(provider.id, {
                                callbackUrl: `/account-redirect?redirectUrl=${query.callbackUrl?.toString()}`,
                                })}>Sign in with {provider.name}
                            </button>
                        </div>
                })}
            </div>
        </div>
    )
}

export default Login