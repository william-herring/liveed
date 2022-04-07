import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Liveed</title>
      </Head>

      <Header links={[
        { title: 'Home', url: '/', active: true },
        { title: 'Trending', url: '/trending', active: false },
        { title: 'For you', url: '/for-you', active: false }
      ]} />
    </div>
  )
}

export default Home
