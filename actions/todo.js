"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import prisma from "@/utils/prismadb";
import { redirect } from "next/navigation";
import {serverAuth, serverAuthJson} from "@/utils/serverAuth";

export const deleteTodo = async (id) => {
    await prisma.todo.delete({ where: { id } });
     redirect('/')

};


// export const editTodo = async (id,body) => {
//     try{

//     await prisma.todo.update({ where: { id }, data: { body:body } });
    
//     revalidatePath("/");
//   }catch{
//     return({message:" مشکلی پیش آمده است"})
//   } 
// };

// export const fetchTodos = async({take=5, skip=0})=>{
//   try {
//     const {currentUser}=await serverAuth()

//     let  todos = await prisma.todo.findMany({
//       where: {
//         userId: currentUser?.id
//       },
//       take,
//       skip,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     const total = await prisma.todo.count({
//         where:{
//             userId: currentUser?.id
//         }
//     })
//     revalidatePath('/')
//     return {
//       data : todos,
//       metadata:{
//           hasNextPage: skip + take <total,
//           totalPage : Math.ceil(total/take)
//       }
//   }
//   } catch (error) {
//     throw new Error('مشکلی پیش آمده است')
//   }



// }



export const fetchJsonTodos = async({take=5, PageNumber=1})=>{
  try {
    const {currentUser}=await serverAuthJson()
    // console.log(currentUser[0])
    // http://localhost:4000/users/2?_embed=todos
    // http://localhost:4000/todos?_page=2&_limit=5
    // http://localhost:4000/todos?userId=1&_page=2&_limit=4
    let fetchtodos = await fetch(`http://localhost:4000/todos?userId=${currentUser[0].id}&_page=${PageNumber}&_limit=${take}`)
    const todos = await fetchtodos.json()
    const fetchTotal = await fetch(`http://localhost:4000/todos?userId=${currentUser[0].id}&_order=desc`)
    const total = await fetchTotal.json()
    revalidatePath('/')
    return {
      data : todos,
      metadata:{
          hasNextPage: PageNumber < Math.ceil(total.length/take),
          totalPage : Math.ceil(total.length/take)
      }
  }
  } catch (error) {
    // console.log(error)
    throw new Error('مشکلی پیش آمده است')
  }



}

export const fetchTodo = async(todoId)=>{
  try {
    let fetchtodo = await fetch(`http://localhost:4000/todos/${todoId}`)
    const todo = await fetchtodo.json()
    // console.log(todo)
    return todo
    
  } catch (error) {
    throw new Error('مشکلی پیش آمده است')
    
  }
}

export const deleteTodoJson = async (id) => {
  try {
    const res = await fetch(`http://localhost:4000/todos/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
    })
    if (!res.ok) {  
      return {status:"failed"}
      
    }
    // revalidateTag('/')
    // revalidatePath('/')
    // redirect('/')
    
  } catch (error) {
    console.log(error)
    return {status:"failed"}

    // throw new Error('مشکلی پیش آمده است')
    
  }

};



export const addUser = async(email,username,hashedPassword)=>{
  const res =await fetch(`http://localhost:4000/users`,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username,email,hashedPassword})
  })
 const newUser = await res.json() 
  return newUser
}

export const addTodo = async(todo)=>{
  try {

  const {currentUser} = await serverAuthJson()
    // console.log(currentUser)
  const res =await fetch(`http://localhost:4000/todos`,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:todo,userId:currentUser[0].id})
  })
  if (!res.ok) {  
    return {status:"failed"}
    
  }
  // const res = await fetch('/api/todos/addTodo',{
  //     method:"POST",
  //     body:JSON.stringify({todo}),
  //     headers:{'Content-Type': "application/json"}
  // })
  const data = await res.json()
  return {...data, status:"success"}
}catch (error) {
    // console.log(error)
    // throw new Error(error.message)
    return {status:"failed"}
    
  }
}
export const editTodo = async (id,body) => {
  try{

    const res =await fetch(`http://localhost:4000/todos/${id}`,{
      method:"PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body})
    })
    if (!res.ok) {  
      return {status:"failed"}
      
    }
  revalidatePath("/");
}catch{
  return({status:"failed"})
} 
};