import React from "react"
import {Routes, Route, Navigate } from 'react-router-dom'
import Clientes from "../Pages/Clientes"
import IncluiCliente from "../Pages/IncluiCliente"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import RandomDog from "../Pages/RandomDog"
import Status from "../Pages/Status"
import ConsultaCliente from "../Pages/ConsultaCliente"
import EditaCliente from "../Pages/EditaCliente"
import ExcluiCliente from "../Pages/ExcluiCliente/index"
import IncluiUser from "../Pages/IncluiUser"
import EsqueceuSenha from "../Pages/EsqueceuSenha"


 function CustomRoute({ children, redirectTo}){
     const Authenticated = localStorage.getItem("token")
    
     return Authenticated ? children : <Navigate to={redirectTo}/>
 
 }
 
export default function RoutesAdm() {
    
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/user" element={<IncluiUser/>}/>
            <Route path="/esqueceu-senha" element={<EsqueceuSenha/>}/>
            <Route path="/home" element={<CustomRoute redirectTo="/"><Home/> /</CustomRoute>} /> 
            <Route path="/status" element={<CustomRoute redirectTo="/"><Status/> /</CustomRoute>} /> 
            <Route path="/randomdog" element={<CustomRoute redirectTo="/"><RandomDog/> /</CustomRoute>} /> 
            <Route path="/clientes" element={<CustomRoute redirectTo="/"><Clientes/> /</CustomRoute>} /> 
            
            <Route path="/clientes/inclui" element={<CustomRoute redirectTo="/"><IncluiCliente/> /</CustomRoute>} /> 
            <Route path="/clientes/consulta/:_id" element={<CustomRoute redirectTo="/"><ConsultaCliente/> /</CustomRoute>} /> 
            <Route path="/clientes/edita/:_id" element={<CustomRoute redirectTo="/"><EditaCliente/> /</CustomRoute>} /> 
            <Route path="/clientes/exclui/:_id" element={<CustomRoute redirectTo="/"><ExcluiCliente/> /</CustomRoute>} /> 
        </Routes>
    )
}

