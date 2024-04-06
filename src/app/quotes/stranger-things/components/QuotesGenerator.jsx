"use client"

import { useCallback, useState, useEffect, useRef } from "react";
import { toast, ToastContainer, Slide } from 'react-toastify';
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure} from "@nextui-org/react";

import "../css/page.css"
import 'react-toastify/dist/ReactToastify.css';

export default function QuotesGenerator() {

    const audioElementOne = useRef()
    const audioElementTwo = useRef()
    const [loading, setLoading] = useState(false)
    const [quotesData, setQuotesData] = useState([])
    const [counterQuote, setCounterQuote] = useState(1)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [isPlaying, setIsPlaying] = useState(false);

    const handleChangeCounterQuote = useCallback((event) => {
        let value = event.target.value
        setCounterQuote(value)
        if (parseInt(value) <= 0) {
            value = 1
            setCounterQuote(1)
        }
    }, [])

    const handleGenerateQuote = async () => {
        try {
            setLoading(true)
            const res = await fetch(`https://strangerthings-quotes.vercel.app/api/quotes/${counterQuote}`)
            if (!res.ok) {
                setLoading(false)
                throw new Error('Failed to fetch data Stranger Things Quotes')
            } else {
                const response = await res.json()
                if (response) {
                    onOpen()
                    setQuotesData(response)
                    setLoading(false)

                    const audioPlayerOne = audioElementOne.current;
                    const audioPlayerTwo = audioElementTwo.current;

                    if (audioPlayerOne) {
                        audioPlayerOne.pause();
                        setIsPlaying(false);

                        audioPlayerTwo.play()
                    }
                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleCopyToClipboard = async (quote) => {
        try {
            await navigator.clipboard.writeText(quote);
            toast.success('Copied to Clipboard.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        } catch (error) {
            console.error('Failed copied to clipboard:', error);
        }
    };

    return (
        <>
            <audio ref={audioElementOne} id="audioPlayer" controls loop className="hidden">
                <source src="/assets/sounds/stranger-things-beat.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={audioElementTwo} id="audioPlayer" controls loop className="hidden">
                <source src="/assets/sounds/stranger-things-demogorgon.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <form className="mt-24">
                <div className="submit-quotes-component md:w-[50rem] w-full mx-auto">
                    <Input
                        size="lg"
                        isClearable
                        type="number"
                        variant="bordered"
                        classNames="label"
                        value={counterQuote}
                        className="font-bold"
                        label="Number of Quotes"
                        labelPlacement="outside"
                        onChange={handleChangeCounterQuote}
                        placeholder="How many quotes do you want to display?"
                        startContent={
                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" className="text-red-600" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .5-.1.7-.3l3.7-3.7H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-9 11H7V8.8L8.3 6h2L8.9 9H11zm6 0h-4V8.8L14.3 6h2l-1.4 3H17z" />
                            </svg>
                        }
                    />
                </div>
                <div className="flex justify-center">
                    <button type="button" onClick={handleGenerateQuote} className={`${(loading || isOpen) && 'opacity-50 pointer-events-none'} button-submit-quote relative bg-button-submit md:w-[50rem] w-full py-3 px-2 mt-10 text-center rounded-[8px] font-bold text-white text-[1.25rem] shadow-lg`}>
                    {
                        loading ? 'Loading quotes...' : 'Generate Now'
                    }
                    </button>
                </div>
            </form>
            <Modal 
                onClick={(event) => {
                    event?.stopPropagation()
                }}
                size='2xl'
                isOpen={isOpen} 
                placement="center"
                scrollBehavior="inside"
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 stranger-things-font-bold">Results</ModalHeader>
                        <ModalBody>
                            <div className="wrapper-result space-y-6">
                            {
                                quotesData?.map((element, index) => {
                                    return (
                                        <div onClick={() => handleCopyToClipboard(`'${element?.quote}' — ${element?.author}`)} key={index} className="box-item-result py-5 px-2 border border-gray-300/50 rounded-[6px] text-white font-bold bg-quote cursor-pointer">
                                            <h2>
                                            `&quot;`{element?.quote}`&quot;` — <span className="stranger-things-font-bold">{element?.author}</span>
                                            </h2>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={() => {
                                onClose()
                                setCounterQuote(1)

                                const audioPlayerTwo = audioElementTwo.current;
                                if (audioPlayerTwo) {
                                    audioPlayerTwo.pause();
                                }
                            }}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            <ToastContainer />
            <button onClick={() => {
                if(!isPlaying) {
                    const audioPlayer = audioElementOne.current;
                    if (audioPlayer) {
                        audioPlayer.play();
                        setIsPlaying(true);
                    }
                } else {
                    const audioPlayer = audioElementOne.current;
                    if (audioPlayer) {
                        audioPlayer.pause();
                        setIsPlaying(false);
                    }
                }
            }} className={`${!isPlaying ? 'pr-3 p-2' : 'pr-0 pl-2 py-2'} bg-[#e61414] hover:bg-opacity-90 transition-opacity fixed right-0 bottom-[3rem] text-white rounded-l-full flex items-center gap-2`}>
                {
                    !isPlaying ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clipRule="evenodd" opacity="0.5" />
                        <path fill="currentColor" d="m15.414 13.059l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787c.781.462.781 1.656 0 2.118" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity="0.5" />
                        <path fill="currentColor" d="M8.076 8.617C8 8.801 8 9.034 8 9.5v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54C10.199 8 9.966 8 9.5 8s-.699 0-.883.076a1 1 0 0 0-.54.541m4.999 0C13 8.801 13 9.034 13 9.5v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54C15.199 8 14.966 8 14.5 8s-.699 0-.883.076a1 1 0 0 0-.54.541" />
                    </svg>
                }
                <span className={`${isPlaying ? 'invisible opacity-0 w-0 h-0' : 'visible opacity-100 w-max h-max'} transition-all`}>Play it</span>
            </button>
        </>

    )
}