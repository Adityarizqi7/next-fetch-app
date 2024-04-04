import Link from "next/link";
import { ToastContainer } from 'react-toastify';

import UserList from "./components/UsersList";
import Pagination from "./components/Pagination";
import CreateButton from "../components/button/CreateButton";

async function getData(page, per_page) {
    const res = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`, { 
      next: {}
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data User')
    }
    return res.json()
}

export const metadata = {
  title: 'Users',
  description: 'Users - API Data Fetching with Next JS by @adityarizqiardhana',
}

/** @type {import("next").Viewport} */
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 4,
    userScalable: true,
    shrinkToFit: 'no',
}

/** @type {import("next").Metadata} */
export async function generateMetadata() {
	return {
		title: 'Users',
		description: 'Users - World App by @adityarizqiardhana',
		applicationName: 'World APP',
		category: 'users',
		keywords: ['Next', 'World', 'App', 'users'],
		authors: [{ name: 'Aditya Rizqi Ardhana', url: 'https://adityara.netlify.app' }],
		creator: 'Aditya Rizqi Ardhana',
		publisher: 'Aditya Rizqi Ardhana',
		openGraph: {
			title: 'Users',
			description: 'Users - World App by @adityarizqiardhana',
			url: 'https://nextapp-fetching.netlify.app/users?page=1',
			siteName: 'Users List - World App',
			images: [
				{
					url: 'https://nextapp-fetching.netlify.app/src/app/opengraph-image-users.png',
					width: 800,
					height: 600,
				},
			],
			type: 'article',
		},
		robots: {
			index: false,
			follow: true,
			nocache: true,
			googleBot: {
			  index: true,
			  follow: false,
			  noimageindex: true,
			  'max-video-preview': -1,
			  'max-image-preview': 'large',
			  'max-snippet': -1,
			},
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Users',
			description: 'Users - World App by @adityarizqiardhana',
			images: ['https://nextapp-fetching.netlify.app/src/app/opengraph-image-users.png'],
		},
	}
}

export default async function Page({searchParams}) {

  const usersData = await getData(searchParams.page || 1, 10);

  return (
      <section className="users-list-component xl:px-0 px-5">
            {/* Breadcumbs */}
            <nav className="flex 5xs:flex-col justify-between gap-x-2 gap-y-5 mb-8">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                          <svg className="w-3 h-3 me-2.5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                          </svg>
                          Home
                      </Link>
                  </li>
                  <li>
                      <div className="flex items-center">
                          <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                          </svg>
                          <div className="ms-1 text-sm font-medium text-blue-500 md:ms-2">Users</div>
                      </div>
                  </li>
              </ol>

              {/* Create Button */}
              <CreateButton pathlink='/users/create' />
            </nav>

            {/* User Table */}
            <UserList dataUser={usersData?.data} />

            {/* Pagination */}
            <Pagination searchParams={searchParams} total_pages={usersData?.total_pages} containerClassName='my-[40px]' />
            
            <ToastContainer />
      </section>
  );
}