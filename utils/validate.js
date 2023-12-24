
export const formValidate=(data,type)=>{
    const errors ={}

   
    if (!data.email) {
        errors.email="لطفا ایمیل را وارد کنید"
        
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email="ایمیل صحیح نمی باشد"

    }else{
        delete errors.email
    }


    if(!data.password ){
        errors.password="لطفا رمزعبور را وارد کنید"
    }else if(data.password.length < 6){
        errors.password = "رمزعبور باید بیشتر از شش حرف باشد"
    }else{
        delete errors.password
    }


    if (type==="SignUp") {
        if (!data.username.trim()) {
            errors.username="لطفا نام کاربری را وارد کنید"
        }else{
            delete(errors.username)
        }

        if(!data.confirm_password ){
            errors.confirm_password="رمزعبور را وارد کنید"
        }else if(data.confirm_password !== data.password){
            errors.confirm_password = "رمز عبور مطابقت ندارد"
        }else{
            delete errors.confirm_password
        }
    
    }

    return errors

}
