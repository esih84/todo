import { ThreeDots } from "react-loader-spinner";

const Loading = ({height="45",color="rgb(14 165 233)",type}) => {
    if (type && type==="delete") {
        return(

                <ThreeDots height={height}   radius="9" color="red" ariaLabel="three-dots-loading"wrapperStyle={{margin:"0 auto"}} wrapperClassName=""visible={true}/>

        )
    }
    return (

        <ThreeDots height={height}  radius="9" color={color} ariaLabel="three-dots-loading"wrapperStyle={{margi:"0 auto"}} wrapperClassName=" text-sky-500 mx-auto"visible={true}/>
        
    );
}

export default Loading;