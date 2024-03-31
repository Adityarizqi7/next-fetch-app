"use client"

import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';
import SigninModal from "../modal/SigninModal";
import {Button, Popover, PopoverTrigger, PopoverContent, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";


export default function SigninNavigation({classNameProfileButton}) {

    const [openMoreMenu, setOpenMoreMenu] = useState(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loadingSignin, setLoadingSignin] = useState(false)
    const [loadingSignout, setLoadingSignout] = useState(false)
    const [token, setToken] = useState(null)


    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSignin = async () => {
        try {
            setLoadingSignin(true)
            const res = await fetch(`https://reqres.in/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            const response = await res.json()

            if(response) {
                setLoadingSignin(false)
                toast.success('Successfully Signin, Enjoy.', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                if (typeof window !== "undefined") {
                    localStorage.setItem('token', response?.token)
                }
                window.location.reload()
            } else {
                setLoadingSignin(false)
                toast.error(`Ups, Fail to Signin, '${response?.error}'.`, {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        } catch (error) {
            setLoadingSignin(false)
            throw new Error(error)
        }
    }

    const handleSignout = async () => {
        try {
            setLoadingSignout(true)
            const res = await fetch(`https://reqres.in/api/logout`)
            const response = await res.json()

            if(response) {
                setOpenMoreMenu(false)
                setLoadingSignout(false)
                toast.success('Successfully Signout.', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                if (typeof window !== "undefined") {
                    localStorage.removeItem('token')
                }
                window.location.reload()
            } else {
                setLoadingSignout(false)
                toast.error(`Ups, Fail to Signout, '${response?.error}'.`, {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        } catch (error) {
            setLoadingSignout(false)
            throw new Error(error)
        }
    }

    useEffect(() => {
        const tokenValue = window.localStorage.getItem('token')
        setToken(tokenValue ? String(tokenValue) : null)
    }, [])

    return (
        !token ?
            <>
                <button onClick={(event) => {
                    onOpen()
                }} className='signin-box bg-blue-100 text-blue-600 hover:bg-blue-200/80 transition-colors rounded-[8px] px-4 py-2'>
                    <span>Signin</span>
                </button>
                <SigninModal isOpen={isOpen} onOpenChange={onOpenChange} handleChangeInput={handleChangeInput} setValue={() => {
                    setValues({
                        email: '',
                        password: ''
                    })
                }} classNameButtonSubmit={`${(loadingSignin || !values?.email || !values?.password) && 'pointer-events-none opacity-50'}`} handleSignin={handleSignin} loadingSignin={loadingSignin} />
            </>
        :
            <div className="relative">
                <Button onClick={(event) => {
                    event?.stopPropagation()
                    setOpenMoreMenu(!openMoreMenu)
                }} className={`${classNameProfileButton ? classNameProfileButton : 'min-w-0'} detail-user__more-button p-0 m-0 bg-transparent flex items-center gap-2`}>
                    <img src="/assets/avatar.jpg" width={40} height={40} alt="Picture of the User" className="aspect-square object-cover rounded-full" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" viewBox="0 0 24 24">
                        <path fill="#000000" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                    </svg>
                </Button>
                <div className={`${openMoreMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity absolute bg-white rounded-[8px] p-1 top-[3.5rem] right-0 border boder-gray-300/50`}>
                    <button onClick={() => {
                        handleSignout()
                    }} className='update-box flex items-center gap-2 px-1 py-2 w-28 hover:bg-slate-200/60 rounded-[8px] text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                                <path strokeDasharray="32" strokeDashoffset="32" d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0" />
                                </path>
                                <path strokeDasharray="12" strokeDashoffset="12" d="M9 12h11.5" opacity="0">
                                    <set attributeName="opacity" begin="0.5s" to="1" />
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                                </path>
                                <path strokeDasharray="6" strokeDashoffset="6" d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5" opacity="0">
                                    <set attributeName="opacity" begin="0.7s" to="1" />
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" />
                                </path>
                            </g>
                        </svg>
                        <span>
                        {
                            loadingSignout ? 'Remove...' : 'Signout'
                        }
                        </span>
                    </button>
                </div>
            </div>
    )
}