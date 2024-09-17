"use client"

// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/providers/DataContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const { setData } = useData()

    return (
        <nav className="p-4 mb-2 text-white text-lg font-semibold bg-red-700">
            <div className=" mx-auto flex justify-between items-center font">
                <div className="">
                    <Link href="/" onClick={() => { if (pathname === '/') setData(null); }} className='flex flex-row hover:text-gray-300 transition no-underline'>
                        <p className='my-auto'>DARS Visualizer</p>
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/about" className={`hover:text-gray-300 transition ${pathname === '/about' ? 'underline underline-offset-4 decoration-logoBlue decoration-2 text-xl' : ''}`}>
                        About
                    </Link>
                    <Link href="https://kyancox.com" target='_blank' className="hover:text-slate-300 transition">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};