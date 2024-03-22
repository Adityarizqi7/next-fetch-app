"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, Slide } from 'react-toastify';
import {Popover, PopoverTrigger, PopoverContent, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";

import 'react-toastify/dist/ReactToastify.css';

export default function UserCard({id, avatar, first_name,last_name, email}, key) {
    
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [openMoreMenu, setOpenMoreMenu] = useState(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const handleDeleteUser = async (id) => {
        try {
            setLoading(true)
            const res = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE'
            })

            if (!res) {
                setLoading(false)
                toast.error('Ups, Fail to delete user, Try again.', {
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
            if (res) {
                setLoading(false)
                setOpenMoreMenu(!openMoreMenu)
                toast.success('Successfully delete user, Good Job.', {
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
            setLoading(false)
            throw new Error(error)
        }
    }

    const [values, setValues] = useState({
        name: `${first_name} ${last_name}`,
        job: ''
    })

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdateUser = async (id) => {
        try {
            setLoadingUpdate(true)
            const res = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(values)
            })

            if (!res) {
                setLoadingUpdate(false)
                toast.error('Ups, Fail to update user, Try again.', {
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
            if(res) {
                setLoadingUpdate(false)
                toast.success('Successfully update user, Good Job.', {
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
            setLoadingUpdate(false)
            throw new Error(error)
        }
    }

    return (
        <>
            <article key={key} onClick={() => {
                router.push(`/users/${id}`)
            }} className="user-card-wrapper border boder-gray-300/80 cursor-pointer sm:hover:-translate-y-1 transition-transform">

                <div className="image-wrapper">
                    <img src={avatar} alt={first_name + ' ' + last_name} className='w-full aspect-square object-center' />
                </div>

                <div className="detail-user-wrapper flex justify-between items-center gap-2 pt-3 pb-4 mx-2 overflow-x-auto">
                    <div className="detail-user__name-email line-clamp-1">
                        <h1 className="line-clamp-1 text-[1.25rem] font-semibold text-slate-800">{first_name} {last_name}</h1>
                        <span className="text-[14px] text-slate-600">{email}</span>
                    </div>
                    <Popover className="rounded-[6px]" placement="left" isOpen={openMoreMenu} onOpenChange={(open) => setOpenMoreMenu(open)}>
                        <PopoverTrigger>
                            <Button onClick={(event) => {
                                event?.stopPropagation()
                            }} className="detail-user__more-button min-w-0 bg-transparent hover:bg-slate-200/80 px-[1px] py-[4px] rounded-[8px] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" viewBox="0 0 24 24"><path fill="#000000" d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3m0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18m0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5s1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5"/></svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="px-1 rounded-[8px]">
                            <div>
                                <button onClick={(event) => {
                                    event?.stopPropagation()
                                    setOpenMoreMenu(false)
                                    onOpen()
                                }} className='update-box flex items-center gap-2 px-1 py-2 w-28 hover:bg-slate-200/60 rounded-[8px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m12.9 6.855l4.242 4.242l-9.9 9.9H3v-4.243zm1.414-1.415l2.121-2.121a1 1 0 0 1 1.414 0l2.829 2.828a1 1 0 0 1 0 1.415l-2.122 2.121z" />
                                    </svg>
                                    <span>Update</span>
                                </button>
                                <button onClick={(event) => {
                                    event?.stopPropagation()
                                    handleDeleteUser(id)
                                }} className={`${loading && 'pointer-events-none opacity-50'} delete-box flex items-center gap-2 px-1 py-2 w-28 hover:bg-slate-200/60 rounded-[8px] text-red-500`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.722.722 0 0 1-.73.714H3.73A.722.722 0 0 1 3 6.524" />
                                        <path fill="currentColor" fillRule="evenodd" d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.34 1.181-5.246l.267-4.187c.1-1.577.15-2.366-.303-2.866c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.289-.303 2.866l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.044.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.04-.433.409-.75.82-.707" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                    {
                                        loading ? 'Deleting...' : 'Delete'
                                    }
                                    </span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
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
                            <ModalHeader className="flex flex-col gap-1">Update User</ModalHeader>
                            <ModalBody className="space-y-2">
                                <Input
                                    name="name"
                                    label="Name"
                                    variant="bordered"
                                    placeholder="Your name"
                                    defaultValue={values?.name}
                                    onChange={handleChangeInput}
                                />
                                <Input
                                    name="job"
                                    label="Job"
                                    variant="bordered"
                                    placeholder="Your job"
                                    defaultValue={values?.job}
                                    onChange={handleChangeInput}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => {
                                    onClose()
                                    setValues({
                                        name: `${first_name} ${last_name}`,
                                        job: ''
                                    })
                                }}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    handleUpdateUser(id)
                                    onClose()
                                    setValues({
                                        name: `${first_name} ${last_name}`,
                                        job: ''
                                    })
                                }}>
                                {
                                    loadingUpdate ? 'Updating user...' : 'Update'
                                }
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                        </ModalContent>
                    </Modal>
                </div>
            </article>
        </>
    )
}