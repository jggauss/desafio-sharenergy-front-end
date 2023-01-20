import React, {createContext, useEffect, useState, } from "react";

import api from "../Config/ConfigApi";


const Context = createContext()

function Authprovider({children}){
    
    const [authenticated,setAuthenticated] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const getLogin = async()=>{
            const token = localStorage.getItem('token')
            if(token && valUser()){
                api.defaults.headers.authorization = `Bearer ${token}`
                setAuthenticated(true)
            }
            setLoading(false)
        }
        getLogin()
    },[])

    const valUser = async () =>{
        const valueToken =localStorage.getItem("token")
           
            const headers= {
                'headers':{
                    'Authorization':'Bearer '+valueToken
            }
        }

        await api.get('/valtoken',headers)
        .then(()=>{
            return true
        })
        .catch(()=>{
            setAuthenticated(false)
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = undefined
            return false
        })
    }

    async function signIn(situacao){
        setAuthenticated(true)
        

    }

    
    async function handleLogout(){
        setAuthenticated(false)
        localStorage.removeItem('token')
        
        api.defaults.headers.Authorization = undefined
        
       
        
    }

    if(loading){
        return <h1>Carregando</h1>
    }
    
    return(
        <Context.Provider value={{authenticated,signIn,handleLogout}}>
            {children}
        </Context.Provider>
    )
}
export {Context, Authprovider}