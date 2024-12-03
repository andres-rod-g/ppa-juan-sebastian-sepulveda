import API from "@/api/API"
import DefaultSizedContainer from "@/components/common/constraints/defaultSizedContainer.component"
import FeaturedProductComponent from "@/components/common/ui/featuredProduct.component"
import ListOfProductsComponent from "@/components/common/ui/listOfProducts.component"
import muckData from "@/constants/muckData"
import type { IProduct } from "@/interfaces/models/products.interface"
import { queryClient } from "@/stores/query"
import { StarIcon } from "@heroicons/react/20/solid"
import { useStore } from "@nanostores/react"
import { useQuery } from "@tanstack/react-query"
import { BoxesIcon } from "lucide-react"
import type React from "react"

interface CustomComponent {
}

const IndexComponent: React.FC<CustomComponent> = ({
}) => {

    const client = useStore(queryClient);
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["getProducts"],
        queryFn: API.getProducts,
    }, client)

    return (
        <div className=" flex">
            <div className=" w-full space-y-6">
                <img src="/banner.svg" />
                <DefaultSizedContainer>
                    <h1 className=" flex items-center text-3xl font-light text-default-800 mb-2"><StarIcon width={20} className=" mr-2" />Producto Más Nuevo</h1>

                    {
                        !!data && <FeaturedProductComponent
                        featuredText="Nuevo"
                        product={(data.data.data as IProduct[])[0]}
                    />
                    }
                    
                </DefaultSizedContainer>
                <DefaultSizedContainer>
                    <h1 className=" flex items-center text-3xl font-light text-default-800 mb-2"><BoxesIcon width={20} className=" mr-2" />Nuestros Productos</h1>

                    {
                        !!data && <ListOfProductsComponent products={data.data.data as IProduct[]} />
                    }
                </DefaultSizedContainer>
            </div>
        </div>
    )
}

export default IndexComponent