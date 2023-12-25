import prisma from "@/utils/prismadb";
import { compare } from "bcryptjs";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


// export const authOptions = {

//     providers: [
    
//             CredentialsProvider({
//               name: "Credentials",

//               async authorize(credentials) {
//                 try {
//                     // console.log(credentials)
//                     const {email, password} = credentials
//                     // console.log(email,password)
//                     if (!email || !password) {
//                       throw new Error("لطفا اطلاعات معتبر وارد کنید");
//                     }
//                     const user = await prisma.user.findUnique({
//                       where: {
//                         email: email,
//                       },
//                     });
//                     // console.log(user)
//                     if (!user || !user?.hashedPassword) {
//                       throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");
//                     }
//                     const isValid = await compare(
//                       password,
//                       user.hashedPassword
//                     );
//                     // console.log(isValid)
//                     if (!isValid) {
//                       throw new Error("ایمیل یا رمز عبور اشتباه است");
//                     }
//                     return {email};
//                 } catch (error) {
//                   console.log(error)
//                   throw new Error("مشکلی در سرور رخ داده است");
                  
//                 }
//               },
//             })
//     ],
// }
export const authOptions = {

  providers: [
  
          CredentialsProvider({
            name: "Credentials",

            async authorize(credentials) {
              try {
                  // console.log(credentials)
                  const {email, password} = credentials
                  // console.log(email,password)
                  if (!email || !password) {
                    throw new Error("لطفا اطلاعات معتبر وارد کنید");
                  }
                  
                  const res = await fetch(`http://localhost:4000/users?email=${email}`)
                  const user = await res.json()
                  // console.log(user[0] )

                  if (!user || !user[0]?.hashedPassword) {
                    throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");
                  }
                  
                  const isValid = await compare(
                    password,
                    user[0].hashedPassword
                  );
                  // console.log(isValid)
                  if (!isValid) {
                    throw new Error("ایمیل یا رمز عبور اشتباه است");
                  }
                  return {email};
              } catch (error) {
                // console.log(error)
                throw new Error(error.message);
                
              }
            },
          })
  ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }