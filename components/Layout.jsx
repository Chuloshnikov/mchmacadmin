import Head from 'next/head';


import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from '@/components/Navbar';


export default function Layout({ children }) {

  const { data: session } = useSession();
  if (!session) {
    return (
    <>
    <div className='bg-gray-800 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
            <button 
            onClick={() => signIn('google')}
            className='bg-white p-2 px-4 rounded-lg text-base font-semibold
            hover:scale-105 duration-300
            '>
                Login with Google
            </button>
        </div>
    </div>
    </>
    );

  } 
   return (
    <div className='bg-gray-800 min-h-screen flex'>
      <Navbar/>
        <div className='bg-white flex-grow mt-2 mr-2 rounded-lg p-4'>
        {children}
        </div>
    </div>
    )
  }