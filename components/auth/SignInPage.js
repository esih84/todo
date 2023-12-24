'use client'
import clsx from 'clsx'
import { formValidate } from "@/utils/validate";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {signIn} from 'next-auth/react'
import Loading from '../modules/Loading';

const SignUpPage = () => {
    const router = useRouter()
    const [form, setForm]=useState({
        email:"",
        password:"",
        isLoading:false
    })
    const[errors,setErrors]=useState({})
    const[touch,setTouch]=useState({})
    
    useEffect(()=>{
        setErrors(formValidate(form))
    }, [form, touch])
    
    const changeHandler = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    const focusHandler =(e) =>{
        setTouch({...touch, [e.target.name]:true})
    }



    const {email, password} = form

    const submitHandler=async(e)=>{

        e.preventDefault()

        setForm({...form,isLoading:true})
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
        setForm({...form,isLoading:false})
        if (res.error) {
            toast.error(res.error,  {
                duration: 6000,
              })
        }else{
            toast.success('ورود با موفقیت انجام شد',{
                duration: 5000,
              })
            router.push('/')
        }
    }
    return (
        <div dir="rtl" className=" bg-gray-100 min-h-screen flex  flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={submitHandler} className="  *:outline-none bg-white px-6 py-8  rounded-lg shadow-md  shadow-sky-200 text-black w-full">
                    <h1 className="mb-8 text-sky-500 text-3xl text-center">ورود</h1>

                    <input 
                        type="text"
                        className={clsx("block hover:border-b-sky-300 transition-all border-b  w-full p-3  mb-4",
                            {
                                'border-b-red-500': errors.email && touch.email
                            }
                        )}
                        name="email"
                        value={form.email} onChange={changeHandler} onFocus={focusHandler}
                        placeholder="نام کاربری یا ایمیل" />
                        {errors.email && touch.email && <span className=' h-4   text-left  w-fit mt-0.5 bg-red-300   text-[0.7rem] text-red-600 px-0.5 py-0.5 rounded '>{errors.email}</span>}


                    <input 
                        className={clsx("block hover:border-b-sky-300 transition-all border-b  w-full p-3  mb-4",
                        {
                            'border-b-red-500': errors.password && touch.password
                        }
                        )}                        
                        name="password"
                        value={form.password} onChange={changeHandler} onFocus={focusHandler}
                        type="password"
                        placeholder="پسورد" />
                        {errors.password && touch.password && <span className=' h-4   text-left  w-fit mt-0.5 bg-red-300   text-[0.7rem] text-red-600 px-0.5 py-0.5 rounded '>{errors.password}</span>}


                    {form.isLoading?
                    <div className=' flex flex-row justify-center text-center items-center'>
                        <Loading/>
                    </div>                    :
                        <button
                        type="submit"
                        
                        className="  w-full text-center py-3 rounded bg-sky-500 text-white transition-all hover: hover:text-sky-500 hover:bg-transparent  my-1"
                    >ورود</button>
                    }


                    <div className="text-center text-sm text-grey-dark mt-4">
                      ثبت نام نکردید؟  
                    <Link className=" no-underline  border-b border-blue text-sky-500 mr-2" href="/SignUp">
                    ساخت حساب
                    </Link>
                    </div>
                </form>


            </div>
            <Toaster/>
        </div>
    );
}

export default SignUpPage;


