"use client"

import Link from "next/link";
import { menus } from "src/app/data/menu";
import { useCallback, useState, useRef, useEffect } from "react";

export const MenuCategoryNavigation = ({ isMobileNavigation = false, ...props }) => {

    const ref = useRef(null)
    const [openBoxApp, setOpenBoxApp] = useState(false)
    
    const handleOpenBoxApp = useCallback(() => {
        setOpenBoxApp(!openBoxApp)
    }, [openBoxApp])

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setOpenBoxApp(!openBoxApp)
            }
        };
        
        if (openBoxApp) {
            window.addEventListener("mousedown", handleOutSideClick);
        }
    
        return () => {
            if (openBoxApp) {
                window.removeEventListener("mousedown", handleOutSideClick);
            }
        };
    }, [ref, openBoxApp]);

    return(
        <section className={`wrapper-menu-app ${isMobileNavigation && 'relative'}`} ref={ref}>
            <button onClick={handleOpenBoxApp} className="flex gap-2 items-center">
                <span>Apps</span>
                <svg
                        fill="none"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                    />
                </svg>
            </button>
            <div className={`container-app ${openBoxApp ? 'opacity-100 visible' : 'opacity-0 invisible'} ${isMobileNavigation ? 'left-0 top-[2.45rem]' : 'top-[5rem] right-0'} p-4 absolute min-w-auto bg-white border border-gray-300/50 transition-all rounded-[8px]`}>
                <ul className="flex gap-x-6">
                {
                    menus?.map((element, index) => {
                        return (
                            <li key={index} className='space-y-1'>
                                <h2 className="text-slate-500 text-[0.85rem]">{element?.category}</h2>
                                <h4 className="hover:underline underline-offset-2">
                                    {
                                        element?.menu_path?.name === 'Universities' ?
                                            <a href={element.menu_path.url} className='text-slate-900'>
                                                {element?.menu_path?.name}
                                            </a>
                                        :
                                            <Link {...props} href={element.menu_path.url} className='text-slate-900'>
                                                {element?.menu_path?.name}
                                            </Link>
                                    }
                                </h4>
                            </li>
                        )
                    })
                }
                </ul>
            </div>  
        </section>
    )
}