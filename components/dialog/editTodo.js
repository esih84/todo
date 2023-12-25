'use client'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DialogBase from './dialog';
import useEditTodo from '@/hooks/useEditTodo';
import useTodoId from '@/hooks/useTodoId';
import { editTodo } from '@/actions/todo';

export default function EditTodo() {
    const body = useTodoId((state) => state.body)
    const id = useTodoId((state) => state.id)
    useEffect(()=>{
        setTodo(body)
    },[body])
    const [todo, setTodo]= useState('')
    const editModal =  useEditTodo()
    
    const submitHandler =async(e)=>{
       const edit= await editTodo(id,todo)
        if (edit?.status === "failed") {
          toast.error("ویرایش نا موفق")
        }else{
          toast.success("ویرایش شد")
          setTodo("")
          setTimeout(()=>{editModal.onClose()},1000)
          
        }
    }
    
    
  return (
    <>
      <DialogBase 
      title="ویرایش یادداشت" 
      open={editModal.isOpen} 
      onClose={editModal.onClose}
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
      submitHandler={submitHandler}
      buttonText = "ویرایش"
       />

    </>
  );
}

