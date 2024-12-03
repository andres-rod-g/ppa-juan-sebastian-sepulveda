import API from "@/api/API";
import type { IComment } from "@/interfaces/models/comments.interface";
import { queryClient } from "@/stores/query";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useStore } from "@nanostores/react";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { download, generateCsv, mkConfig } from "export-to-csv";
import { useRef } from "react";
import generatePDF from "react-to-pdf";


type Props = {
    productId: string
};
const ProductCommentsComponent: React.FC<Props> = ({
    productId
}) => {
    const client = useStore(queryClient);

    const { data, isPending, isError, status } = useQuery({
        queryKey: ["comments", productId],
        // @ts-ignore
        queryFn: () => API.getComments(productId),
    },
        client
    )

    const pdfRef = useRef<HTMLDivElement>(null)

    const generateExcel = () => {
        const csvConfig = mkConfig({ useKeysAsHeaders: true });

        console.log(data!.data.data)

        // Converts your Array<Object> to a CsvOutput string based on the configs
        // @ts-ignore
        const csv = generateCsv(csvConfig)([...data!.data.data.map((v) => {

            v = {
                ...v,
                user: undefined
            }

            return v
        }
        )] ?? []);

        // Get the button in your HTML
        download(csvConfig)(csv)
    }

    if (isPending) {
        return <Spinner className=" mx-auto my-8" />
    }

    if (isError) {
        return <p className=" text-danger-500 font-semibold">
            Hubo un error al obtener los comentarios
        </p>
    }

    return <>
        <div className=" flex flex-row space-x-2">
            <a
                className=" w-full"
            >
                <Button
                    color="primary"
                    className=" text-white w-full"
                    startContent={
                        <Icon icon={"solar:document-bold"} fontSize={25} />
                    }
                    onClick={() => generatePDF(pdfRef, { filename: 'page.pdf' })}
                >PDF
                </Button>
            </a>
            <Button
                color="primary"
                className=" text-white w-full"
                startContent={
                    <Icon icon={"solar:widget-bold"} fontSize={25} />
                }
                onClick={() => generateExcel()}
            >Excel
            </Button>
        </div>
        <div className=" flex flex-col space-y-1 w-full mt-4" ref={pdfRef}>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {
                (data.data.data as IComment[]).map((v) => <>
                    {/* <pre>{JSON.stringify(v, null, 2)}</pre> */}
                    <CommentComponent commentData={v} />
                </>)
            }
        </div>
    </>;
};

const CommentComponent = ({ commentData }: { commentData: IComment }) => {
    const client = useStore(queryClient);

    const { data, isError, isSuccess } = useQuery({
        queryKey: ["user", commentData.authorUserId],
        queryFn: () => API.getUserData(commentData.authorUserId),
    }, client)



    return (
        <div className=" flex w-full bg-white p-4 rounded-xl">
            <Avatar name={data?.data.data.name} className=" mr-4" />
            <div className=" flex flex-col">
                <p className="font-semibold text-sm">{data?.data.data.name}</p>
                <p className=" font-light text-default-600">{commentData.text}</p>
            </div>
        </div>
    )
}
export default ProductCommentsComponent;