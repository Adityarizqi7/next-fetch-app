import Link from "next/link";
import { Suspense } from "react";
import {Skeleton, Accordion, AccordionItem} from "@nextui-org/react";

import { menus } from "./data/menu";

export default function Page() {

	return (
		<section className="home-component">
			<div className="list-menu-fetching-container xl:px-0 px-5 gap-5 space-y-7">
			{
				menus?.map((element, index) => {
					return (
						<div key={index} className='space-y-3'>
							<div className="title-category">
								<h1 className="text-[1.45rem] font-semibold">{element?.category}</h1>
							</div>
							<div className="list-menu-fetching-box grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
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
								</Suspense>
								<section key={index} className="box-app-by-category space-y-4">
									<article className="wrapper-menu-box w-full">
										<Link href={element?.menu_path?.url} className="border border-solid border-gray-300/80 p-4 rounded-[8px] space-y-2 block hover:bg-slate-100/30">
											<h2 className="font-semibold text-[1.25rem]">{element?.name}</h2>
											<h4>{element?.description}</h4>
										</Link>
									</article>
								</section>
							</div>
						</div>
					)
				})
			}
			</div>
		</section>
	);
}