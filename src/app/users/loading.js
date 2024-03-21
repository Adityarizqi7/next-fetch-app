import { Skeleton } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="wrapper-users grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-9 gap-y-8 xl:px-0 px-5">
            {
                Array.from({ length: 5 }, (_, index) => (
                    <article key={index} className="wrapper-menu-box-skeleton border border-solid border-gray-300/80 p-4 space-y-5">
                        <Skeleton className="w-full rounded-lg">  
                            <div className="w-full h-[12rem] rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-2">
                            <Skeleton className="w-2/5 4xs:w-full rounded-lg">
                                <div className="h-7 w-2/5 4xs:w-full rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 4xs:w-full rounded-lg">
                                <div className="h-7 w-4/5 4xs:w-full rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                    </article>
                ))
            }
        </div>
    )
}