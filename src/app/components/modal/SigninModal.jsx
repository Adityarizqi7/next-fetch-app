"use client"

import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input} from "@nextui-org/react";


export default function SigninModal({isOpen, onOpenChange, handleChangeInput, setValue, classNameButtonSubmit, handleSignin, loadingSignin}) {

    return (
        <Modal 
            onClick={(event) => {
                event?.stopPropagation()
            }}
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="center"
        >
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Signin Next APP</ModalHeader>
                    <ModalBody>
                        <div className="subtitle mb-2">
                            <h4>Sign in to access the full feature. Using the users email in Reqres.</h4>
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
                            setValue()
                        }}>
                            Close
                        </Button>
                        <Button className={classNameButtonSubmit} color="primary" onPress={handleSignin}>
                        {
                            loadingSignin ? 'Signing...' : 'Signin'
                        }
                        </Button>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}