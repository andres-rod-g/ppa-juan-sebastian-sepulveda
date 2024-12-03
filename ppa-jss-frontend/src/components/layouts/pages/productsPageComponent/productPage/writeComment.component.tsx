import API from "@/api/API";
import { queryClient } from "@/stores/query";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useStore } from "@nanostores/react";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";

type Props = {
    productId: string
};

const WriteComentComponent: React.FC<Props> = ({
    productId
}) => {
    const client = useStore(queryClient);

    const [text, setText] = useState<string>("")

    const commentMutation = useMutation({
        mutationFn: API.createComment,
    }, client)

    return (
        <div>
            {
                Cookies.get("token")
                    ?
                    <Textarea
                placeholder="Escribe tu comentario"
                classNames={{
                    inputWrapper: "bg-white"
                }}
                onChange={(e) => {
                    setText(e.target.value)
                }}
                endContent={
                    (
                        <Button color="primary" className=" text-white" onClick={() => {
                            if (text.length < 1) return
                            commentMutation.mutate({
                                productId,
                                text
                            })
                        }}><PaperAirplaneIcon width={19} height={19}/></Button>
                    )
                }
            />
                    :
                        <p className=" text-primary">Para comentar, primero inicia sesión o regístrate</p>
            }
            
            {
                commentMutation.isSuccess && <p className=" text-success-500 font-bold">Comentario publicado.</p>
            }
            {
                commentMutation.isError && <p className=" text-danger-500 font-bold">Error al publicar el comentario.</p>
            }
        </div>
    );
};
export default WriteComentComponent;