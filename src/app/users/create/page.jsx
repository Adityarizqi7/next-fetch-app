'use client'

import Link from "next/link";
import { useState } from "react"
import { toast, ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Page() {

    const [values, setValues] = useState({
        name: '',
        job: ''
    })

    const [loading, setLoading] = useState(false)

    const handleCreateUser = async (event) => {
        event.preventDefault()

        try {
            
            setLoading(true)
            const res = await fetch('https://reqres.in/api/users', {
                method: 'POST',
                body: JSON.stringify(values)
            })

            if (!res) {
                setLoading(false)
                toast.error('Ups, Fail to create user, Try again.', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            } 
            if(res) {
                setLoading(false)
                toast.success('Successfully create user, Good Job.', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        } catch (error) {
            setLoading(false)
            throw new Error(error)
        }
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            {/* Breadcumbs */}
            <nav className="breadcumbs flex mb-8 xl:px-0 px-5">
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
                            <span className="ms-1 text-sm font-medium text-gray-500 pointer-events-none hover:text-blue-600 md:ms-2">Create User</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Form Create */}
            <section className="user-form-component xl:px-0 px-5 flex md:flex-row flex-col gap-y-6">
                <div className="heading-component md:w-[45%]">
                    <h1 className="text-[3rem] font-semibold md:text-left text-center">Create User</h1>
                </div>
                <form onSubmit={handleCreateUser} className='w-full'>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" onChange={handleChangeInput} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="job" className="block mb-2 text-sm font-medium text-gray-900">Job</label>
                        <input type="text" onChange={handleChangeInput} name="job" id="job" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your job" required />
                    </div>
                    <button type="submit" className={`${(loading || !values?.name || !values?.job) ? 'pointer-events-none opacity-50' : ''} w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all`}>
                    {
                        loading ? 'Sending data...' : 'Submit'
                    }
                    </button>
                </form>
            </section>
            <ToastContainer />
        </>
    )
}