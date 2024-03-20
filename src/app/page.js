import Link from "next/link";

export default function Page() {

	return (
		<section className="home-component">
			<div className="list-menu-fetching grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
				<article className="wrapper-menu-box w-full">
					<Link href='/users?page=1' className="border border-solid border-gray-300/80 p-4 rounded-[8px] space-y-2 block hover:bg-slate-100/30">
						<h1 className="font-semibold text-[1.25rem]">Users List</h1>
						<h4>Menampilkan daftar pengguna menggunakan API Public dari Reqres.</h4>
					</Link>
				</article>
			</div>
		</section>
	);
}