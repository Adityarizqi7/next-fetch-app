import Link from "next/link";
import { Suspense } from "react";
import {Skeleton} from "@nextui-org/react";

export default function Page() {

	return (
		<section className="home-component">
			<div className="list-menu-fetching grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:px-0 px-5 gap-5">
				<Suspense fallback={
					<article className="wrapper-menu-box-skeleton border border-solid border-gray-300/80 p-4 rounded-[8px] space-y-5">
						<Skeleton className="w-2/5 rounded-lg">  
							<div className="h-7 w-2/5 rounded-lg bg-default-300"></div>
						</Skeleton>
						<Skeleton className="w-full rounded-lg">
							<div className="h-7 w-full rounded-lg bg-default-200"></div>
						</Skeleton>
					</article>
				}>
					<article className="wrapper-menu-box w-full">
						<Link href='/users?page=1' className="border border-solid border-gray-300/80 p-4 rounded-[8px] space-y-2 block hover:bg-slate-100/30">
							<h1 className="font-semibold text-[1.25rem]">Users List</h1>
							<h4>Displays list of users using API Public from Reqres.</h4>
						</Link>
					</article>
					<article className="wrapper-menu-box w-full">
						<Link href='/universities?page=1&ctr=Indonesia' className="border border-solid border-gray-300/80 p-4 rounded-[8px] space-y-2 block hover:bg-slate-100/30">
							<h1 className="font-semibold text-[1.25rem]">Universities Around The World</h1>
							<h4>Displays list of universities using API Public from Hipo.</h4>
						</Link>
					</article>
				</Suspense>
			</div>
		</section>
	);
}