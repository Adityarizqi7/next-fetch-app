import Link from "next/link";
import UniversitiesList from "./components/UniversitiesList";

async function getData(name, country) {
    let res
    if (name) {
        res = await fetch(`http://universities.hipolabs.com/search?name=${name}`, { 
          next: {
            revalidate: 60
          }
        })
    } else {
      res = await fetch(`http://universities.hipolabs.com/search?country=${country}`, { 
        next: {
            revalidate: 60
        }
      })
    }

    if (!res.ok) {
      throw new Error('Failed to fetch data Universities')
    }
    return res.json()

}

export const metadata = {
  title: 'Universities Around The World',
  description: 'Get to know Universities around the World - API Data Fetching with Next JS by @adityarizqiardhana',
}

export default async function Page({ searchParams }) {

  const univName = searchParams.q || ''
  const countryName = searchParams.ctr
  const universitiesData = await getData(univName, countryName);

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
                          <div className="ms-1 text-sm font-medium text-blue-500 md:ms-2">Universities ({countryName ? countryName : 'All Country'})</div>
                      </div>
                  </li>
              </ol>
            </nav>

            {/* Universities Table */}
            <UniversitiesList dataUniversities={universitiesData} />
      </section>
  );
}