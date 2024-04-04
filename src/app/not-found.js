import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "../assets/404.png"

export default function NotFound() {

    return (
        <div className="not-found-component text-center xl:px-0 px-5 !h-screen flex flex-col justify-center">
            <div className="content space-y-3">
                <Image 
                    width={300}
                    height={300}
                    alt="Picture of 404"
                    src={NotFoundImage}
                    className='mx-auto'
                />
                <h1 className="font-semibold text-[1.35rem]">
                    404, The page you are looking for cannot be found.
                </h1>
            </div>
            <div className="mx-auto mt-8">
                <Link 
                    href='/'
                    className="flex gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-slate-100 rounded-[8px] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" className="rotate-[270deg]">
                        <g fill="none">
                            <path fill="currentColor" d="M11.25 20a.75.75 0 0 0 1.5 0zm1.5 0V4h-1.5v16z" opacity="0.5" />
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m18 10l-6-6l-6 6" />
                        </g>
                    </svg>
                    <span>
                        Go to Home Page
                    </span>
                </Link>
            </div>
        </div>
    )
}