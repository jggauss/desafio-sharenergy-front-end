import Formulario from "./Components/Formulario";
import './App.css'
import { useState } from "react";
import Api from './Config/ConfigApi'
function App() {
  const [status, setStatus]= useState({
    type:'',
    mensagem:''
  })
  const[logado,setLogado]=useState([])

  const aoNovoLogado = async (login)=>{

    console.log(login)
    const headers = {
      'Content-Type':'application/json'
    }
    await Api.post('/login',login, {headers})
    .then((response)=>{
      console.log(response.data.message)
      setStatus({
        type:'success',
        message:response.data.message
      })

    }).catch((erro)=>{
      console.log(erro.response.data.message)
      setStatus({
        type:'error',
        message:erro.response.data.message
      })
    })
  }


  return (
    <div className="centraliza">
     <Formulario status={status} aoLoginEfetuado={login=>aoNovoLogado(login)}/>
    </div>
  );
}

export default App;
