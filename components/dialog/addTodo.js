'use client'

import useTodo from '@/hooks/useAddTodo';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DialogBase from './dialog';

export default function AddTodo() {
    const router = useRouter()
    const [todo, setTodo]= useState("")
    const addModal =  useTodo()
    console.log(todo)
    const submitHandler =async(e)=>{
        e.preventDefault()
        const res = await fetch('/api/todos/addTodo',{
            method:"POST",
            body:JSON.stringify({todo}),
            headers:{'Content-Type': "application/json"}
        })
        const data = await res.json()
        if (data.error) {
            toast.error(data.error,  {
                duration: 6000,
              })
        }
        if (res.status===201) {
          toast.success(data.message,  {
            duration: 6000,
          })
          
          addModal.onClose()
          setTodo("")
          router.refresh(
          )
        }
    }
    
    
  return (
    <>
      <DialogBase 
      title="اضافه کردن یادداشت" 
      open={addModal.isOpen} 
      onClose={addModal.onClose}
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
      submitHandler={submitHandler}
      buttonText = "ایجاد"
       />

    </>
  );
}


{/* <Dialog dir='rtl' maxWidth="md" fullWidth open={addModal.isOpen} onClose={addModal.onClose}>
<DialogTitle className=' text-sky-500'>اضافه کردن یادداشت</DialogTitle>
<DialogContent>

  <TextField
    
    autoFocus
    margin="dense"
    id="todo"
    value={todo}
    onChange={(e)=>setTodo(e.target.value)}
    // label="Email Address"
    type="text"
    fullWidth
    variant="standard"
  />
</DialogContent>
<DialogActions>
  <Button color='error' onClick={()=>addModal.onClose()}>انصراف</Button>
  <Button  variant="outlined" onClick={submitHandler}>ایجاد</Button>
</DialogActions>
<Toaster/>
</Dialog> */}