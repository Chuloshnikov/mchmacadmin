import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession();
  if(!session) return;

  return (
    <>
    <Head>
      <title>MCH Macstore admin</title>
      <meta name="description" content="Welcome to admin panel" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
        <Layout>
          <div className='text-gray-800 flex justify-between'>
            <h2>
              Hello, <b>{session?.user?.name}</b>
            </h2>
            <div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
            <img src={session?.user?.image} alt="userImg" className='w-8 h-8'/>
              <span className='py-1 px-2'>
                {session?.user?.name}
              </span>
            </div>    
          </div>
        </Layout>
    </main>
  </>
  );
     
   

}

  

