'use client'
import {  Pagination } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const PaginationButton = ({totalPage}) => {

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const [page, setPage]= useState(currentPage)
    const handleChange = (event, value) => {
        setPage(value);
      };


    //   console.log(page)
    return (
           <div className=" flex items-center justify-center">

               <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
           </div>
    );
}

export default PaginationButton;