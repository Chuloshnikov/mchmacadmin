import React from 'react';
import { MdDesktopMac } from 'react-icons/md';
import { AiOutlineHome, AiOutlineSetting, AiOutlineUnorderedList, AiOutlineInbox } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {

    const inactiveLink = "flex items-center gap-1 p-1";
    const activeLink = inactiveLink+" bg-white text-gray-800 rounded-l-lg";

    const router = useRouter();
    const {pathname} = router;

  return (
    <aside className='text-gray-300 p-4 pr-0'>
        <Link 
        href={'/'}
        className='flex items-center gap-1 mb-4 mr-4'>
            <p className='text-[22px] font-semibold'>MCHMAC</p>
            <MdDesktopMac className='h-[25px] w-[25px] -ml-1'/>
            <p className='text-[22px] font-semibold'>Admin</p>
        </Link>
        <nav className='flex flex-col gap-3 font-semibold'>
            <Link 
            href={'/'}
            className={pathname === '/' ? activeLink : inactiveLink}
            >
                <AiOutlineHome/>
                Dashboard
            </Link>
            <Link 
            href={'/products'}
            className={pathname.includes('/products') ? activeLink : inactiveLink}
            >
                <AiOutlineInbox/>
                Products
            </Link>
            <Link 
            href={'/categories'}
            className={pathname.includes('/categories') ? activeLink : inactiveLink}
            >
                <BiCategoryAlt/>
                Categories
            </Link>
            <Link 
            href={'/orders'}
            className={pathname.includes('/orders') ? activeLink : inactiveLink}
            >
                <AiOutlineUnorderedList/>
                Orders
            </Link>
            <Link 
            href={'/settings'}
            className={pathname.includes('/settings') ? activeLink : inactiveLink}
            >
                <AiOutlineSetting/>
                Settings
            </Link>
        </nav>
    </aside>
  )
}

export default Navbar;