'use client'

import Link from "next/link"
import { useState } from "react"

const NavigationMobile = () => {

    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <button type="button" onClick={handleOpenMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className={`${openMenu ? 'md:hidden block' : 'hidden'} w-full md:w-auto`} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse space-y-5 md:mt-0 md:border-0 md:bg-white">
                    <li onClick={handleOpenMenu}>
                        <Link href="/" className="block text-slate-900 hover:text-opacity-80 rounded md:bg-transparent">Home</Link>
                    </li>
                    <li onClick={handleOpenMenu}>
                        <Link href="/users?page=1" className="block text-slate-900 hover:text-opacity-80 rounded md:bg-transparent">Users</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavigationMobile