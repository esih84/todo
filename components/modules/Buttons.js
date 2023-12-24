'use client'

import { Button } from "@mui/material";
import Loading from "./Loading";
import useEditTodo from "@/hooks/useEditTodo";
import useTodoId from "@/hooks/useTodoId";
import { deleteTodo } from "@/actions/todo";
import { useTransition } from "react";

const Buttons = ({todo}) => {
    const [isDeletePending, startDeleteTransition] = useTransition();
    const editModal =  useEditTodo()
    const setBody = useTodoId((state) => state.setBody)
    const setId = useTodoId((state) => state.setId)
    return (
        <>
            {isDeletePending?<Loading/>:
                <Button onClick={()=>startDeleteTransition(()=>{deleteTodo(todo.id)}) } variant="outlined" size="small" color="error" >
                حذف
                </Button>
            }
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