'use client'

import { useRouter } from "next/navigation"

export default function CreateButton({containerClassName, pathlink}) {

    const router = useRouter()

    return (
        <button onClick={() => {
            router.push(pathlink)
        }} className={`${containerClassName} rounded-[8px] bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 transition-colors`}>Create User</button>
    )
}