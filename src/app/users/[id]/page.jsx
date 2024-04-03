import Link from "next/link";

async function getData(id) {

    const res = await fetch(`https://reqres.in/api/users/${id}`, {
        next: {
            revalidate: 10
        }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data User Detail')
    }
    return res.json()
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
export async function generateMetadata({ params }) {

    const { data } = await getData(params.id)

    return {
        title: `${data?.first_name + ' ' + data?.last_name}`,
        description: `${data?.first_name + ' ' + data?.last_name} - API Data Fetching with Next JS by @adityarizqiardhana`,
        applicationName: 'Next Fetch APP',
		category: 'user detail',
		keywords: ['Next', 'App', 'user', 'detail'],
		authors: [{ name: 'Aditya Rizqi Ardhana', url: 'https://adityara.netlify.app' }],
		creator: 'Aditya Rizqi Ardhana',
		publisher: 'Aditya Rizqi Ardhana',
		openGraph: {
			title: `${data?.first_name + ' ' + data?.last_name}`,
			description: `${data?.first_name + ' ' + data?.last_name} - API Data Fetching with Next JS by @adityarizqiardhana`,
			url: `https://nextapp-fetching.netlify.app/users/${params.id}`,
			siteName: `User Detail ${data?.first_name + ' ' + data?.last_name} - Next Fetch App`,
			images: [
				{
					url: 'https://nextapp-fetching.netlify.app/src/app/opengraph-image-user-detail.png',
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
			title: `${data?.first_name + ' ' + data?.last_name}`,
			description: `${data?.first_name + ' ' + data?.last_name} - API Data Fetching with Next JS by @adityarizqiardhana`,
			images: ['https://nextapp-fetching.netlify.app/src/app/opengraph-image-user-detail.png'],
		},
    }
}

export default async function Page({ params }) {

    const { data } = await getData(params.id)

    return (
        <section className="users-detail-component xl:px-0 px-5">

            {/* Breadcumbs */}
            <nav className="breadcumbs flex mb-8">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link href="/users?page=1" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                            Users
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="ms-1 pointer-events-none text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">User <strong>({data?.first_name + ' ' + data?.last_name})</strong></span>
                        </div>
                    </li>
                </ol>
            </nav>
            
            {/* User Detail */}
            <article className="box-user flex 4xs:flex-col gap-4">
                <img src={data?.avatar} alt={data?.first_name + ' ' + data?.last_name} className='rounded-[6px] w-[150px]' />
                <div className="space-y-2">
                    <h1 className="text-[1.15rem] text-slate-900 font-semibold">{data?.first_name + ' ' + data?.last_name}</h1>
                    <h3>{data?.email}</h3>
                </div>
            </article>
        </section>
    );
}