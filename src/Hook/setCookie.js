import Cookie from "js-cookie";

const SetCookie =(cookiename, usrin)=>{
    Cookie.set(cookiename,usrin,{
        expires:1,
        SameSite:"none",
        secure:true,
        path:'/'
    })
}
export default SetCookie