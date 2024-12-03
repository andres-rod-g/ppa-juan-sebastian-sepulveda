import { ChatBubbleLeftIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/20/solid"

const HeaderComponent = () => {
    return (
        <header className=" flex flex-row px-8 py-4 bg-white/85 justify-between items-center sticky top-0 left-0 right-0 z-20 backdrop-blur-md">
            <h1 className=" font-light text-xl text-primary">Productario</h1>
            <nav className=" flex flex-row font-light space-x-4 text-sm text-default-700 ">
                <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="/"><HomeIcon className=" text-sm flex w-4 h-10 mr-2" /> Inicio</a>
                <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="/products"><ShoppingCartIcon className=" text-sm flex w-4 h-10 mr-2" /> Productos</a>
                <a className=" flex flex-row items-center px-2 hover:bg-default-100 hover:font-bold hover:text-primary rounded-md transition-all duration-200" href="#"><ChatBubbleLeftIcon className=" text-sm flex w-4 h-10 mr-2" /> Comentarios Recientes</a>
            </nav>
            <div>
                <div className=" flex w-10 h-10 rounded-full bg-default-200">
                    <UserIcon className=" text-default-400" />
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent