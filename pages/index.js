import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useSession, signIn, signOut } from "next-auth/react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: session } = useSession();
  if (!session) {
    return (
      <>
      <Head>
        <title>MCH Macstore admin</title>
        <meta name="description" content="Welcome to admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='bg-gray-800 w-screen h-screen flex items-center'>
          <div className='text-center w-full'>
              <button 
              onClick={() => signIn('google')}
              className='bg-white p-2 px-4 rounded-lg text-base font-semibold'>
                Login with Google
              </button>
          </div>
        </div>
      </main>
    </>
    );

  } 
   return (
    <div>
      logged in {session.user.email}
    </div>
   )
  }

  

