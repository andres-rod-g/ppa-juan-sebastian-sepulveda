import type { IProduct } from "@/interfaces/models/products.interface";

type Props = {
    product: IProduct
};
const ProductTagsComponent: React.FC<Props> = ({
    product
}) => {
    return (
        <div className=" flex flex-row text-[10px] font-light space-x-1">
            {
                product.tags.map((v) => <p className=" bg-primary-50 border border-primary-200 px-2 py-1 rounded-full">{v}</p>)
            }
        </div>
    )
};
export default ProductTagsComponent;