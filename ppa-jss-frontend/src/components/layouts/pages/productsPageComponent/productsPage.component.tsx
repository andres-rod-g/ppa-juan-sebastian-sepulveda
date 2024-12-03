import API from "@/api/API"
import DefaultSizedContainer from "@/components/common/constraints/defaultSizedContainer.component"
import ListOfProductsComponent from "@/components/common/ui/listOfProducts.component"
import muckData from "@/constants/muckData"
import type { IProduct } from "@/interfaces/models/products.interface"
import { queryClient } from "@/stores/query"
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { useStore } from "@nanostores/react"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { BoxesIcon } from "lucide-react"

const ProductsPageComponent = () => {
    const client = useStore(queryClient);
    const {data, isPending, isError, isSuccess} = useQuery({
        queryKey: ["getProducts"],
        queryFn: API.getProducts,
    }, client)

    return (
        <>
            <DefaultSizedContainer>
                <a href="/create/product" className="flex w-full">
                    <Button color="primary" className="text-white mb-4 flex w-full"><PlusCircleIcon width={20} /> Crear Nuevo Producto</Button>
                </a>
                <h1 className=" flex items-center text-3xl font-light text-default-800 mb-2"><BoxesIcon width={20} className=" mr-2" />Nuestros Productos</h1>
                {/* <pre>{JSON.stringify(data!.data.data, null, 2)}</pre> */}
                {
                    isPending && <Spinner/>
                }
                {
                    !!data && <ListOfProductsComponent products={data.data.data as IProduct[]} />
                }
            </DefaultSizedContainer>
        </>
    )
}

export default ProductsPageComponent