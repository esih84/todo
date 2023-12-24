'use client'
import clsx from 'clsx'
import { formValidate } from "@/utils/validate";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from '../modules/Loading';


const SignUpPage = () => {
    const router = useRouter()
    const [form, setForm]=useState({
        username:"",
        email:"",
        password:"",
        confirm_password:"",
        isLoading:false
    })
    const[errors,setErrors]=useState({})
    const[touch,setTouch]=useState({})
    
    useEffect(()=>{
        setErrors(formValidate(form, "SignUp"))
    }, [form, touch])
    
    const changeHandler = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    const focusHandler =(e) =>{
        setTouch({...touch, [e.target.name]:true})
    }



    const {username,email, password} = form
    const submitHandler=async(e)=>{

        e.preventDefault()

        setForm({...form,isLoading:true})
        const res = await fetch('/api/auth/SignUp',{
            method:"POST",
            body:JSON.stringify({username,email, password}),
            headers:{'Content-Type': "application/json"}
        })
        const data = await res.json()
        setForm({...form,isLoading:false})
        if (data.error) {
            toast.error(data.error,  {
                duration: 6000,
              })
        }
        if (res.status===201) {
            router.push('/SignIn')
        }
    }
    return (
        <div dir="rtl" className=" bg-gray-100 min-h-screen flex  flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={submitHandler} className="  *:outline-none bg-white px-6 py-8  rounded-lg shadow-md  shadow-sky-200 text-black w-full">
                    <h1 className="mb-8 text-sky-500 text-3xl text-center">ثبت نام</h1>

                    <input 
                        type="text"
                        className={clsx("block hover:border-b-sky-300 transition-all border-b  w-full p-3  mb-4",
                            {
                                'border-b-red-500': errors.username && touch.username
                            }
                        )}
                        name="username"
                        value={form.username} onChange={changeHandler} onFocus={focusHandler}
                        placeholder="نام کاربری" />
                        {errors.username && touch.username && <span className=' h-4   text-left  w-fit mt-0.5 bg-red-300   text-[0.7rem] text-red-600 px-0.5 py-0.5 rounded '>{errors.username}</span>}


                    <input 
                        type="text"
                        className={clsx("block hover:border-b-sky-300 transition-all border-b  w-full p-3  mb-4",
                            {
                                'border-b-red-500': errors.email && touch.email
                            }
                        )}                        
                        name="email"
                        value={form.email} onChange={changeHandler} onFocus={focusHandler}

                        placeholder="ایمیل" />
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



                    <input 
                        className={clsx("block hover:border-b-sky-300 transition-all border-b  w-full p-3  mb-4",
                        {
                            'border-b-red-500': errors.confirm_password && touch.confirm_password
                        }
                        )}                        
                        name="confirm_password"
                        value={form.confirm_password} onChange={changeHandler} onFocus={focusHandler}
                        
                        type="password"
                        placeholder="تکرار پسورد" />
                        {errors.confirm_password && touch.confirm_password && <span className=' h-4   text-left  w-fit mt-0.5 bg-red-300   text-[0.7rem] text-red-600 px-0.5 py-0.5 rounded '>{errors.confirm_password}</span>}


                        {form.isLoading?
                    <div className=' flex flex-row justify-center text-center items-center'>
                        <Loading/>
                    </div>
                    :
                    
                    <button
                        type="submit"
                        
                        className="  w-full text-center py-3 rounded bg-sky-500 text-white transition-all hover: hover:text-sky-500 hover:bg-transparent  my-1"
                    >ساخت حساب</button>
                        }
                    <div className="text-center text-sm text-grey-dark mt-4">
                      ثبت نام کردید؟  
                    <Link className=" no-underline  border-b border-blue text-sky-500 mr-2" href="/SignIn">
                        ورود
                    </Link>
                    </div>
                </form>


            </div>
            <Toaster/>
        </div>
    );
}

export default SignUpPage;



// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

        // <Container   component="main" maxWidth="xs">
        //   <Box
        //     sx={{
                
        //       marginTop: 20,
        //       display: 'flex',
        //       flexDirection: 'column',
        //       alignItems: 'center',
        //       boxShadow:"grey"
        //     }}
        //   >
 
        //     <Typography component="h1" variant="h4">
        //     ثبت نام
        //     </Typography>
        //     <Box component="form" noValidate sx={{ mt: 3 }}>
        //       <TextField
        //         dir='rtl'
        //         margin="normal"
        //         required
        //         fullWidth
        //         variant="standard"
        //         id="email"
        //         label="ایمیل"
        //         name="email"
        //         autoComplete="email"
        //         autoFocus
        //       />
        //       <TextField
        //         margin="normal"
        //         required
        //         fullWidth
        //         variant="standard"
        //         name="password"
        //         label="رمزعبور"
        //         type="password"
        //         id="password"
        //         autoComplete="current-password"
        //       />

        //       <Button
        //         type="submit"
        //         fullWidth
        //         variant="contained"
        //         sx={{ mt: 3, mb: 2 }}
        //       >
        //         ثبت نام

        //       </Button>
        //       <Grid container >
        //         <Grid item  >
        //           <Link href="#" variant="body2">
        //             {"Don't have an account? Sign Up"}
        //           </Link>
        //         </Grid>
        //       </Grid>
        //     </Box>
        //   </Box>
        // </Container>