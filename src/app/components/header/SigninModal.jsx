"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, Slide } from 'react-toastify';
import {Button, Popover, PopoverTrigger, PopoverContent, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";

import Avatar from "src/app/assets/avatar.jpg"


export default function SigninModal() {

    const [openMoreMenu, setOpenMoreMenu] = useState(false)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loadingSignin, setLoadingSignin] = useState(false)
    const [loadingSignout, setLoadingSignout] = useState(false)
    const [token, setToken] = useState(
        typeof window !== "undefined" && localStorage.getItem('token')
    )


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

    // useEffect(() => {
    //     if (localStorage.getItem('token') && !token) {
    //         setToken(localStorage.getItem('token'))
    //     }
    // }, [token])

    return (
        <>
        {
            !token ?
                <>
                    <button onClick={(event) => {
                        onOpen()
                    }} className='signin-box bg-blue-100 text-blue-600 hover:bg-blue-200/80 transition-colors rounded-[8px] px-4 py-2'>
                        <span>Signin</span>
                    </button>
                    <Modal 
                        onClick={(event) => {
                            event?.stopPropagation()
                        }}
                        isOpen={isOpen} 
                        onOpenChange={() => {
                            onOpenChange()
                        }}
                        placement="center"
                    >
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">Signin Next APP</ModalHeader>
                            <ModalBody>
                                <div className="subtitle mb-2">
                                    <h4>Sign in to access the full feature. Using the user`&apos;`s email in Reqres.</h4>
                                </div>
                                <div className="space-y-5">
                                    <Input
                                        isRequired
                                        name="email"
                                        label="Email"
                                        variant="underlined"
                                        placeholder="Your email"
                                        onChange={handleChangeInput}
                                    />
                                    <Input
                                        isRequired
                                        type="password"
                                        name="password"
                                        label="Password"
                                        variant="underlined"
                                        placeholder="Whatever you want dude."
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => {
                                    onClose()
                                    setValues({
                                        email: '',
                                        password: ''
                                    })
                                }}>
                                    Close
                                </Button>
                                <Button className={`${(loadingSignin || !values?.email || !values?.password) && 'pointer-events-none opacity-50'}`} color="primary" onPress={() => {
                                    handleSignin()
                                }}>
                                {
                                    loadingSignin ? 'Signing...' : 'Signin'
                                }
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                        </ModalContent>
                    </Modal>
                </>
            :
                <Popover className="rounded-[6px]" placement="bottom" isOpen={openMoreMenu} onOpenChange={(open) => setOpenMoreMenu(open)}>
                    <PopoverTrigger>
                        <Button onClick={(event) => {
                            event?.stopPropagation()
                        }} className="detail-user__more-button min-w-0 p-0 m-0 bg-transparent flex items-center gap-2">
                            <Image
                                width={40}
                                height={40}
                                src={Avatar}
                                alt="Picture of the User"
                                className="aspect-square object-cover rounded-full"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" viewBox="0 0 24 24">
                                <path fill="#000000" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                            </svg>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="px-1 rounded-[8px] mt-2">
                        <div>
                            <button onClick={() => {
                                handleSignout()
                            }} className='update-box flex items-center gap-2 px-1 py-2 w-28 hover:bg-slate-200/60 rounded-[8px] text-red-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                                        <path stroke-dasharray="32" stroke-dashoffset="32" d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0" />
                                        </path>
                                        <path stroke-dasharray="12" stroke-dashoffset="12" d="M9 12h11.5" opacity="0">
                                            <set attributeName="opacity" begin="0.5s" to="1" />
                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                                        </path>
                                        <path stroke-dasharray="6" stroke-dashoffset="6" d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5" opacity="0">
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
                    </PopoverContent>
                </Popover>
        }
        </>
    )
}