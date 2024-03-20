'use client'

import ReactPaginate from 'react-paginate'
import { useRouter } from "next/navigation"

export default function Pagination({searchParams, total_pages, containerClassName}) {

    const router = useRouter()

    const paginationHandler = (page) => {
        const nextPage = page.selected + 1;
        router.push(`/users?page=${nextPage}`);
    };

    return (
        <ReactPaginate
            nextLabel='→'
            breakLabel='...'
            previousLabel='←'
            breakClassName='break-me'
            subContainerClassName='p-0 m-0'
            pageLinkClassName='px-[12px] py-[8px] hover:bg-[#e2dfdf] rounded-[8px] transition-colors'
            activeLinkClassName='bg-[#e9e6e6d7] rounded-[8px] transition-colors'
            containerClassName={`flex items-center justify-end gap-2 m-0 p-0 text-[16px] font-semibold text-[#3E3232] rounded-[12px] ${containerClassName}`}

            initialPage={searchParams.page - 1}
            pageCount={total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={paginationHandler}
        />
    )
}