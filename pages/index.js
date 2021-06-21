import Head from 'next/head'
import Sidebar from '../Component/Sidebar'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat App</title>

      </Head>
      <Sidebar />
    </div>
  )
}
