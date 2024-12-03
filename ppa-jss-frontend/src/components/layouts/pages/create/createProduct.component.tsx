import API from "@/api/API";
import DefaultSizedContainer from "@/components/common/constraints/defaultSizedContainer.component"
import type { IProduct } from "@/interfaces/models/products.interface";
import components from "@/lib/utils/formity/formityComponents"
import productDataSchema from "@/lib/utils/formity/schemas/productData.formitySchema"
import { queryClient } from "@/stores/query";
import { useStore } from "@nanostores/react";
import { Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formity, type Flow, type Value } from "formity"
import { useEffect } from "react";

interface CustomProps {
    slug?: string;
}

const CreateProductComponent: React.FC<CustomProps> = ({
    slug
}) => {
    const client = useStore(queryClient);

    const {data, isSuccess, isError} = useQuery({
        queryKey: ['product', slug],
        queryFn: () => API.getProduct(slug),
        retry: false
    }, client)

    const postProductMutation = useMutation({
        mutationFn: API.createProduct
    }, client)

    const updateProductMutation = useMutation({
        mutationFn: (data: IProduct) => API.updateProduct(slug!, data)
    }, client)

    const handleReturn = (data: Value, flow: Flow) => {
        console.log(data)

        if (!slug){
            postProductMutation.mutate(data as IProduct)
        } else {
            updateProductMutation.mutate(data as IProduct)
        }
    }

    useEffect(() => {
    }, [isSuccess])

    if (postProductMutation.isPending || updateProductMutation.isPending) {
        return <>
            <Spinner />
        </>
    }

    if (slug && !data?.data?.data) {
        return <></>
    }    

    return (
        <>
            <DefaultSizedContainer>
                <h1 className=" text-center font-medium text-3xl">{slug ? "Actulizar Producto" : "Crear Producto"}</h1>
                
                <Formity components={components} schema={productDataSchema} variables={isSuccess ? {...data!.data.data, _id: undefined, __v: undefined, createdAt: undefined, updatedAt: undefined, tags: data!.data.data.tags.join(",")} : undefined} onReturn={handleReturn} />
                {
                    postProductMutation.isError || updateProductMutation.isError && <p className=" text-danger-500 font-bold">Hubo un error a la hora de crear el producto. Intenta mas tarde.</p>
                }

                {
                    postProductMutation.isSuccess || updateProductMutation.isSuccess && <p className=" text-success-500 font-bold">Producto creado con éxito.</p>
                }
            </DefaultSizedContainer>
        </>
    )
}

export default CreateProductComponent