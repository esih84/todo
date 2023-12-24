'use client'

import SignInPage from "@/components/auth/SignInPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const SignIn = () => {
    const router = useRouter()
    const {data:user}= useSession()
    if(user){
        router.push('/')
        return;
    }
    return (
        <SignInPage/>
    );
}

export default SignIn;