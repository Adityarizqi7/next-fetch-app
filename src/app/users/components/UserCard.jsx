"use client"

import { Suspense } from "react";
import { useRouter } from "next/navigation"
import {Skeleton} from "@nextui-org/react";

export default function UserCard({id, avatar, first_name,last_name, email}, key) {
    
    const router = useRouter()

    return (
        <article key={key} onClick={() => {
            router.push(`/users/${id}`)
        }} className="user-card-wrapper border boder-gray-300/80 cursor-pointer hover:-translate-y-1 transition-transform">
            <div className="image-wrapper">
                <img src={avatar} alt={first_name + ' ' + last_name} className='w-full aspect-square object-center' />
            </div>
            <div className="detail-user-wrapper pt-3 pb-4 mx-2 overflow-x-auto">
                <h1 className="line-clamp-1 text-[1.25rem] font-semibold text-slate-800">{first_name} {last_name}</h1>
                <span className="text-[14px] text-slate-600">{email}</span>
            </div>
        </article>
    )
}