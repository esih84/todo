'use client'

import { Button } from "@mui/material";

const Error = ({error, reset}) => {
    return (

        <div dir="rtl" className=" *:p-3  flex justify-center  p-10 shadow-lg rounded-md   min-h-32  my-12">

            <h1 className=" text-sky-500">{error.message}</h1>
            <Button onClick={()=>reset()}>تلاش مجدد</Button>
        </div>
    );
}

export default Error;