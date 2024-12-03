import API from "@/api/API";
import type { IComment } from "@/interfaces/models/comments.interface";
import { queryClient } from "@/stores/query";
import { useStore } from "@nanostores/react";
import { Avatar, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

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

    if (isPending) {
        return <Spinner className=" mx-auto my-8" />
    }

    if (isError) {
        return <p className=" text-danger-500 font-semibold">
            Hubo un error al obtener los comentarios
        </p>
    }

    return <>
        <div className=" flex flex-col space-y-1 w-full mt-4">
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
            <Avatar name={data?.data.data.name} className=" mr-4"/>
            <div className=" flex flex-col">
                <p className="font-semibold text-sm">{data?.data.data.name}</p>
                <p className=" font-light text-default-600">{commentData.text}</p>
            </div>
        </div>
    )
}
export default ProductCommentsComponent;