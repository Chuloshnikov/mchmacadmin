import React from 'react';
import { MdDesktopMac } from 'react-icons/md';
import { AiOutlineHome, AiOutlineSetting, AiOutlineUnorderedList, AiOutlineInbox } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {

    const inactiveLink = "flex items-center gap-1 p-1";
    const activeLink = inactiveLink+" bg-white text-gray-800 rounded-l-lg"

  return (
    <aside className='text-gray-300 p-4 pr-0'>
        <Link 
        href={'/'}
        className='flex items-center gap-1 mb-4'>
            <p className='text-[22px] font-semibold'>MCHMAC</p>
            <p className='text-[22px] font-light'>Admin</p>
            <MdDesktopMac className='h-[25px] w-[25px] -ml-1'/>
        </Link>
        <nav className='flex flex-col gap-3'>
            <Link 
            href={'/'}
            className={activeLink}
            >
                <AiOutlineHome/>
                Dashboard
            </Link>
            <Link 
            href={'/'}
            className="flex items-center gap-1"
            >
                <AiOutlineInbox/>
                Products
            </Link>
            <Link 
            href={'/'}
            className="flex items-center gap-1"
            >
                <AiOutlineUnorderedList/>
                Orders
            </Link>
            <Link 
            href={'/'}
            className="flex items-center gap-1"
            >
                <AiOutlineSetting/>
                Settings
            </Link>
        </nav>
    </aside>
  )
}

export default Navbar;