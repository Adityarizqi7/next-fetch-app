import CreateUserForm from "./components/CreateUserForm"


/** @type {import("next").Metadata} */
export async function generateMetadata() {
	return {
		title: 'Create User',
		description: 'Create User - World App by @adityarizqiardhana',
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
			title: 'Create User',
			description: 'Create User - World App by @adityarizqiardhana',
			images: ['https://nextapp-fetching.netlify.app/src/app/opengraph-image-users.png'],
		},
	}
}

export default function Page() {

    return (
        <>
            <CreateUserForm />
        </>
    )
}