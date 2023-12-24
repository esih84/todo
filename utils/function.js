export const shortener = (body) => {
    const splitedBody = body.split(" ");
    let newBody;
    if (splitedBody.length>4) {
        
        newBody  = `${splitedBody[0]} ${splitedBody[1]} ${splitedBody[2]} ${splitedBody[3]} ...`
    }else{
        newBody  = `${splitedBody[0]}`

    }
    return newBody;
}
