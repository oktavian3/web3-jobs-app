'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
export default function SiteChrome({children}:{children:ReactNode}) {
 const course = usePathname().startsWith('/course');
 return <div className="flex min-h-screen flex-col">{!course && <Navbar/>}<main className="flex-1">{children}</main>{!course && <Footer/>}</div>;
}
