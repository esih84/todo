// import serverAuth from "@/utils/serverAuth"
import serverAuth from "@/utils/serverAuth";
import { NextResponse } from "next/server";


export const POST= async(request)=>{
    try {
        const {todo}= await request.json()
        // console.log(todo)
        const {currentUser} = await serverAuth()
        // console.log(currentUser)
        // {
        //     id: '6586d627b004d74b11eb0b12',
        //     name: null,
        //     username: 'esmaeil',
        //     email: 'esmaeilh.haji84@gmail.com',
        //     emailVerified: null,
        //     hashedPassword: '$2a$12$eKvmyOcJ4n1PhHJi2ibxIOwUDf.7Kxj7m0umytZhGg/OUEwYzn.fG',
        //     createdAt: 2023-12-23T12:44:23.026Z,
        //     updatedAt: 2023-12-23T12:44:23.026Z
        //   }
        if (!todo) {
            return NextResponse.json({error:"لطفا اطلاعات معتبر وارد کنید"},{status:422})
        }
        
        const createTodo = await prisma.todo.create({
            data:{
                body:todo,
                userId:currentUser.id
            }
        })
        // console.log(createTodo)
        return NextResponse.json({message:"یادداشت اضافه شد"},{status:201})
    
    } catch (error) {
        return NextResponse.json({error:"مشکلی در سرور رخ داده است"},{status:500})
    }

}