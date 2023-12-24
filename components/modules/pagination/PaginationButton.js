'use client'
import clsx from "clsx";
import Link from "next/link";


const PaginationButton = ({page=1, totalPage, hasNextPage}) => {


    //   console.log(page)
    const currentPage = Math.min(Math.max(Number(page), 1), totalPage);
    // console.log(currentPage)

	const getPagesToShow = () => {
		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (currentPage <= 3) {
			startPage = 1;
			endPage = 3;
		} else if (currentPage >= totalPage - 2) {
			startPage = totalPage - 4;
			endPage = totalPage;
		}

		return Array.from(
			{ length: totalPage },
			(_, i) => startPage + i,
		);
	};

	const pages = getPagesToShow();
    return (
		<div className="flex items-center justify-center space-x-6 text-black">
			<Link
				className={clsx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					currentPage === 1 ? 'pointer-events-none bg-gray-100' : '',
				)}
				href={`?page=${currentPage - 1}`}
			>
				Previous
			</Link>

			<nav
				aria-label="Pagination"
				className="relative z-0 inline-flex -space-x-px rounded-md"
			>
				{pages.map((p, i) => (
					<Link
						key={p}
						className={clsx(
							'relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50',
							p === currentPage
								? 'pointer-events-none bg-gray-100'
								: '',
							i === 0 ? 'rounded-l-md' : '',
							i === pages.length - 1 ? 'rounded-r-md' : '',
						)}
						href={`?page=${p}`}
					>
						{p}
					</Link>
				))}
			</nav>

			<Link
				className={clsx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					!hasNextPage ? 'pointer-events-none bg-gray-100' : '',
				)}
				href={`?page=${currentPage + 1}`}
			>
				Next
			</Link>
		</div>
	);
}

export default PaginationButton;