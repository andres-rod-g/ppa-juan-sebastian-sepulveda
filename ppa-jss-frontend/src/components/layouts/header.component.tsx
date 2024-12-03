import API from "@/api/API";
import components from "@/lib/utils/formity/formityComponents";
import userRegisterSchema from "@/lib/utils/formity/schemas/userAuth.formitySchema";
import userLoginSchema from "@/lib/utils/formity/schemas/userLogin.formitySchema";
import { queryClient } from "@/stores/query";
import { ChatBubbleLeftIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/20/solid"
import { useStore } from "@nanostores/react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useMutation } from "@tanstack/react-query";
import { Formity, type Flow, type Value } from "formity";
import { useEffect, useState } from "react";

import Cookies from 'js-cookie';

const HeaderComponent = () => {
    const client = useStore(queryClient);
    const [selectedTab, setSelectedTab] = useState<"register" | "login">("register");
    

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getProperAuthAPIUrl = async () => {
        console.log("Called proper auth api url")
        return selectedTab === "register" ? API.fastRegisterUser : API.userLogin
    }

    let loginMutation = useMutation({
        // @ts-ignore
        mutationFn: API.userLogin
    }, client)

    let fastRegisterMutation = useMutation({
        mutationFn: API.fastRegisterUser
    }, client)

    const handleReturn = (data: Value, flow: Flow) => {
        console.log(data)

        if (selectedTab === "login") {
            loginMutation.mutate(data as Object)
        } else {
            fastRegisterMutation.mutate(data as Object)
        }
    }

    useEffect(() => {
        if (!(loginMutation.isSuccess || fastRegisterMutation.isSuccess)) return
        window.location.reload();
    }, [loginMutation, fastRegisterMutation])
    

    return (
        <header className=" flex flex-row px-8 py-4 bg-white/85 justify-between items-center sticky top-0 left-0 right-0 z-20 backdrop-blur-md">
            <h1 className=" font-light text-xl text-primary">Productario</h1>
            <nav className=" flex flex-row font-light space-x-4 text-sm text-default-700 ">
                <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="/"><HomeIcon className=" text-sm flex w-4 h-10 mr-2" /> Inicio</a>
                <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="/products"><ShoppingCartIcon className=" text-sm flex w-4 h-10 mr-2" /> Productos</a>
                {/* <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="#"><ChatBubbleLeftIcon className=" text-sm flex w-4 h-10 mr-2" /> Comentarios Recientes</a> */}
            </nav>
            <div>
                <button onClick={Cookies.get("token") ? undefined : onOpen} className=" flex w-10 h-10 rounded-full bg-default-200 items-center justify-center">
                    <UserIcon className=" text-default-400" width={30} />
                </button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ body: "bg-default-100" }}>
                <ModalContent>
                    {(onClose) => (
                        <div className=" items-center">
                            <ModalHeader className="flex flex-col gap-1">Autenticación</ModalHeader>
                            <ModalBody className=" items-center">
                                {
                                    loginMutation.isPending || fastRegisterMutation.isPending && <Spinner />
                                }
                                {
                                    !(loginMutation.isPending || fastRegisterMutation.isPending) && <>
                                        <Tabs
                                            // selectedKey={selectedTab}
                                            // @ts-ignore
                                            onSelectionChange={setSelectedTab}
                                        >
                                            <Tab key="login" title="Iniciar">

                                            </Tab>
                                            <Tab key="register" title="Registrarse">

                                            </Tab>
                                        </Tabs>
                                        <Formity components={components} schema={selectedTab === "register" ? userRegisterSchema : userLoginSchema} onReturn={handleReturn} />
                                    </>
                                }
                                {
                                    loginMutation.isError || fastRegisterMutation.isError && <p className=" text-danger-500">Error. Algo salió mal.</p>
                                }
                                {
                                    loginMutation.isSuccess || fastRegisterMutation.isSuccess && <p className=" text-success-500">Realizado con éxito.</p>
                                }
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>

        </header>
    )
}

export default HeaderComponent