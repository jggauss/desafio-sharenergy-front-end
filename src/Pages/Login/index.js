import Formulario from "../../Components/Formulario";
import './Login.css'
import { useContext,  useState } from "react";
import Api from '../../Config/ConfigApi.js'
import { Context } from "../../Context/AuthContext";


import SetCookie from "../../Hook/setCookie";

function Login() {
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const { signIn } = useContext(Context)


  const aoNovoLogado = async (login) => {

    const { username, password } = login
    const headers = {
      'Content-Type': 'application/json',
      
  }

    await Api.post('/login', login,headers)
      .then((response) => {

        setStatus({
          type: 'success',
          message: response.data.message
        })

        SetCookie('remember',true)
        SetCookie('userName', username)
        SetCookie('password', password)

        localStorage.setItem('token', response.data.token)
        signIn(true)

      }).catch((erro) => {

        setStatus({
          type: 'error',
          message: erro.response.data.message
        })
      })
  }

  

  return (
    <div className="centraliza">
      <Formulario status={status} aoLoginEfetuado={login => aoNovoLogado(login)} />
    </div>
  );
}

export default Login;
