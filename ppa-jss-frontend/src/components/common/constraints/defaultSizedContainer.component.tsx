interface CustomProps {
    children: React.ReactNode
}

const DefaultSizedContainer: React.FC<CustomProps> = ({
    children
}) => {
    return (
        <div className=" w-full mx-2 max-w-[100vw] md:mx-auto md:w-[700px] flex flex-col">
            {children}
        </div>
    )
}

export default DefaultSizedContainer