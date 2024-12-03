import API from "@/api/API";
import DefaultSizedContainer from "@/components/common/constraints/defaultSizedContainer.component"
import type { IProduct } from "@/interfaces/models/products.interface";
import components from "@/lib/utils/formity/formityComponents"
import fastUserRegisterSchema from "@/lib/utils/formity/schemas/fastUserRegister.formitySchema"
import { queryClient } from "@/stores/query";
import { useStore } from "@nanostores/react";
import { Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Formity, type Flow, type Value } from "formity"

interface CustomProps {
    slug?: string;
}

const CreateProductComponent: React.FC<CustomProps> = ({
    slug
}) => {
    const client = useStore(queryClient);
    const postProductMutation = useMutation({
        mutationFn: API.createProduct
    }, client)

    const handleReturn = (data: Value, flow: Flow) => {
        console.log(data)
        postProductMutation.mutate(data as IProduct)
    }

    if (postProductMutation.isPending) {
        return <>
            <Spinner />
        </>
    }


    return (
        <>
            <DefaultSizedContainer>
                <h1 className=" text-center font-medium text-3xl">{slug ? "Actulizar Producto" : "Crear Producto"}</h1>
                <Formity components={components} schema={fastUserRegisterSchema} onReturn={handleReturn} />
                {
                    postProductMutation.isError && <p className=" text-danger-500 font-bold">Hubo un error a la hora de crear el producto. Intenta mas tarde.</p>
                }

                {
                    postProductMutation.isSuccess && <p className=" text-success-500 font-bold">Producto creado con éxito.</p>
                }
            </DefaultSizedContainer>
        </>
    )
}

export default CreateProductComponent