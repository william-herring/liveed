import { NextPage } from "next";
import Head from "next/head";

const NotFound: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Page not found - Liveed</title>
            </Head>
            <div className='flex flex-col text-center justify-center h-screen mx-6'>
                <h1 className='font-bold text-4xl text-red-500 p-3'>Page not found</h1>
                <p className='text-gray-500'>We couldn't find the page you were looking for. Are you sure that the URL is spelt correctly?</p>
                <a href='/' className='font-md text-red-500'>Back to homepage</a>
            </div>
        </div>
    )
}

export default NotFound