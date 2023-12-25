import { addUser } from "@/actions/todo";
import prisma from "@/utils/prismadb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";



// export const POST =async(request)=>{
//     try {
//         const { email, username, password } = await request.json();
//         // console.log({ email, username, password });
//         if (!email || !username || !password) {
//             return NextResponse.json({error:"لطفا اطلاعات معتبر وارد کنید"},{status:422})
//         }
//         const existingemail =  await prisma.user.findUnique({
//             where:{
//                 email:email    
//             }
//         })
//         const existingusername =  await prisma.user.findUnique({
//             where:{
//                 username:username    
//             }
//         })
//         // console.log(existinguser)
//         if (existingemail || existingusername) {
//             return NextResponse.json({error:"این حساب کاربری وجود دارد"},{status:422})
//         }
//         const hashedPassword = await hash(password, 12);
//         // console.log(hashedPassword)
//         const user = await prisma.user.create({
//           data: {
//             email,
//             username,
//             hashedPassword,
//           },
//         });
//         // console.log(user)
//         return NextResponse.json({message:"حساب کاربری ایجاد شد"}, { status: 201 });
//       } catch (error) {
//         return NextResponse.json({error:"مشکلی در سرور رخ داده است"}, { status: 500 });
//       }
// }

export const POST =async(request)=>{
  try {
      const { email, username, password } = await request.json();
      // console.log({ email, username, password });
      if (!email || !username || !password) {
          return NextResponse.json({error:"لطفا اطلاعات معتبر وارد کنید"},{status:422})
      }
      // console.log(email)
      const existingemailres =  await fetch(`http://localhost:4000/users?email=${email}`)
      const existingemail = await existingemailres.json()

      const existingusernameres = await fetch(`http://localhost:4000/users?username=${username}`)
      const existingusername = await existingusernameres.json()

      if (existingemail.length || existingusername.length) {
          return NextResponse.json({error:"این حساب کاربری وجود دارد"},{status:422})
      }
      const hashedPassword = await hash(password, 12);
      // console.log(hashedPassword)
      const user = await addUser(email,username,hashedPassword)
      console.log(user)
      return NextResponse.json({message:"حساب کاربری ایجاد شد"}, { status: 201 });
    } catch (error) {
      return NextResponse.json({error:"مشکلی در سرور رخ داده است"}, { status: 500 });
    }
}