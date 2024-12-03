import API from "@/api/API";
import DefaultSizedContainer from "@/components/common/constraints/defaultSizedContainer.component"
import ProductTagsComponent from "@/components/common/ui/productTags.component";
import type { IProduct } from "@/interfaces/models/products.interface";
import { beautifyNumber } from "@/lib/utils/formatters";
import { queryClient } from "@/stores/query";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { useStore } from "@nanostores/react";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import WriteComentComponent from "./writeComment.component";

interface CustomProps {
    productId: string
}

const ProductPageComponent: React.FC<CustomProps> = ({
    productId
}) => {

    const client = useStore(queryClient);
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["getProduct", { productId }],
        queryFn: async () => await API.getProduct(productId),
    }, client)

    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        console.log(data)
        if (!data) return
        setProduct(data.data.data)
    }, [data])

    if (isPending) {
        return <Spinner />
    }

    if (isError || !data || !product) {
        return <DefaultSizedContainer>
            <p className=" text-danger-500">Producto no encontrado o error en el servidor.</p>
        </DefaultSizedContainer>
    }

    return (
        <>
            <div className=" flex flex-col w-[80vw] mx-auto">
                <div className=" flex flex-row">
                    <img className=" flex w-1/2 rounded-lg bg-white" src={product.imageUrl} alt="" />
                    <div className=" flex flex-col w-1/2 pl-4 space-y-3">
                        <div>
                            <h1 className=" font-bold text-4xl text-default-900">{product.name}</h1>
                            <p className=" font-semibold text-primary text-xl">${beautifyNumber(product.price)}</p>
                            <ProductTagsComponent product={product} />
                        </div>

                        <p className=" font-light text-default-600">{product.description}</p>
                    </div>
                </div>
                <div className=" mt-8">
                    <h1 className=" flex items-center text-3xl font-light text-default-800 mb-2"><ChatBubbleLeftIcon width={20} className=" mr-2" />Nuestros Productos</h1>
                    <WriteComentComponent productId={productId}/>
                </div>
            </div>
        </>
    )
}

export default ProductPageComponent