'use client'

import { Button } from "@mui/material";
import Loading from "./Loading";
import useEditTodo from "@/hooks/useEditTodo";
import useTodoId from "@/hooks/useTodoId";
import { deleteTodo, deleteTodoJson } from "@/actions/todo";
import { useTransition } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

const Buttons = ({todo}) => {
    const pathname = usePathname()
    console.log(pathname)
    const router = useRouter()
    // const [isDeletePending, startDeleteTransition] = useTransition();
    const editModal =  useEditTodo()
    const setBody = useTodoId((state) => state.setBody)
    const setId = useTodoId((state) => state.setId)
    const deleteHandler=async(e)=>{
        
        e.preventDefault()

        const data = await deleteTodoJson(todo.id)

          if (data?.status === "failed") {
            //   toast.error("مشکلی پیش آمده")
            console.log("error")
            }else{
                 router.push('/')

          }

    }
    //    await deleteTodo(todo.id)
    return (
        <>
            {/* {isDeletePending?<Loading/>:
                <Button onClick={()=>startDeleteTransition(deleteTodoJson(todo.id)) } variant="outlined" size="small" color="error" >
                حذف
                </Button>
            } */}

                <Button onClick={deleteHandler} variant="outlined" size="small" color="error" >
                حذف
                </Button>
            
            <Button onClick={()=>(
                editModal.onOpen(),
                setBody(todo.body),
                setId(todo.id)

            )} variant="outlined" size="small" color="info" >
                ادیت
            </Button>
        </>
    );
}

export default Buttons;