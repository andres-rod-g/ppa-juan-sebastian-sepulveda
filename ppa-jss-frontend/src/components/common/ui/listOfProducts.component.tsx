import type { IProduct } from "@/interfaces/models/products.interface"
import { beautifyNumber } from "@/lib/utils/formatters"
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid"
import { Button } from "@nextui-org/button"
import ProductTagsComponent from "./productTags.component"

interface CustomProps {
    products: IProduct[]
}

const ListOfProductsComponent: React.FC<CustomProps> = ({
    products
}) => {
    return (
        <div className=" flex flex-row flex-wrap gap-3 justify-start">
            {
                products.map((v, i) => <div className={`flex flex-col w-[32%] rounded-lg p-4 bg-white text-wrap`}>
                    <img src={v.imageUrl} className=" flex w-full aspect-square object-cover rounded-md" />
                    <p className=" font-medium text-xl mt-2">{v.name}</p>
                    <p className=" text-sm font-semibold text-primary -mt-1">${beautifyNumber(v.price)}</p>
                    <ProductTagsComponent product={v}/>
                    <p className=" text-xs font-light mt-2 text-default-500 line-clamp-3">{v.description}</p>
                    <a className=" mt-auto flex flex-col w-full" href={`/products/${v._id}`}>
                        <Button color="primary" className=" flex text-white mt-2"><ChatBubbleLeftIcon width={20} />Comentarios</Button>
                    </a>

                </div>
                )
            }
        </div>
    )
}

export default ListOfProductsComponent