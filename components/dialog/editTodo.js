'use client'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DialogBase from './dialog';
import useEditTodo from '@/hooks/useEditTodo';
import useTodoId from '@/hooks/useTodoId';
import { editTodo } from '@/actions/todo';

export default function EditTodo() {
    const router = useRouter()
    const body = useTodoId((state) => state.body)
    const id = useTodoId((state) => state.id)
    useEffect(()=>{
        setTodo(body)
    },[body])
    const [todo, setTodo]= useState('')
    const editModal =  useEditTodo()
    
    const submitHandler =(e)=>{
        editTodo(id,todo)

        editModal.onClose()
        setTodo("")
        toast.success("ویرایش شد")
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

