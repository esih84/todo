'use client'
import SignUpPage from "@/components/auth/SignUpPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter()
    const {data:user}= useSession()
    if(user){
        router.push('/')
        return;
    }
    return (
        <SignUpPage/>
    );
}

export default SignUp;