import type { IProduct } from "@/interfaces/models/products.interface"
import DefaultSizedContainer from "../constraints/defaultSizedContainer.component"
import { Button } from "@nextui-org/button"
import { ChatBubbleLeftIcon, StarIcon } from "@heroicons/react/20/solid";
import { beautifyNumber } from "@/lib/utils/formatters";
import ProductTagsComponent from "./productTags.component";

interface CustomProps {
    product: IProduct;
    featuredText: string;
}

const FeaturedProductComponent: React.FC<CustomProps> = ({
    product,
    featuredText
}) => {
    return (
        <div className=" flex relative flex-row w-full bg-white rounded-lg overflow-hidden h-[250px] p-4">
            <img className=" flex h-full relative w-auto aspect-square rounded-md shadow-md object-cover" src={product.imageUrl} />
            <div className=" flex flex-col h-full px-4 py-2 justify-center space-y-2 text-wrap">
                <div className=" flex flex-col">
                    <h1 className=" font-bold text-3xl">{product.name}</h1>
                    <p className=" text-md font-semibold text-primary">${beautifyNumber(product.price)}</p>
                    <ProductTagsComponent product={product}/>
                </div>
                <p className=" text-sm font-light text-default-500 line-clamp-3">{product.description}</p>
                <Button color="primary" className=" flex text-white"><ChatBubbleLeftIcon width={20}/>Comentarios</Button>
            </div>
            <div className="flex flex-row items-center absolute top-3 right-3 bg-danger-500 p-2 font-bold text-xs text-white rounded-sm">
                <StarIcon width={21} className=" pr-1"/>
                {featuredText}
            </div>
        </div>
    )
}

export default FeaturedProductComponent