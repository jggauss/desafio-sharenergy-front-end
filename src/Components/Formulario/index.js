
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import MensagemErro from "../MensagemErro"
import './Formulario.css'
import GetCookie from "../../Hook/getCookie"
import RemenberMe from "../RemenberMe"


const Formulario = (props) => {
    const nome = GetCookie('userName')
    const senha = GetCookie('password')
    const [username, setUsername] = useState(nome)
    const [password, setPassword] = useState(senha)

    function salvar(evento) {
        evento.preventDefault()
        props.aoLoginEfetuado({
            username,
            password
        })
    }

    return (


        <section className="formulario">

            <div className="formulario-box">

                <div className="img-login-box">

                    <div className="img-login">
                        <img className="foto" src="./images/logos.GDASH-07.png" alt="Imagem cabeçalho do Login" />
                    </div>

                </div>
                <MensagemErro tipo={props.status.type} message={props.status.message} />
                {props.status.type === "success" ? (<Navigate to="/home" />) : ""}
                <form onSubmit={salvar} className="wrapped-formulario" >
                    <div className="wraped-login">
                        <div className="campo-login">
                            <CampoTexto
                                label="Username"
                                placeholder="Digite seu Username"
                                type="string"
                                valor={username}
                                aoAlterado={valor => setUsername(valor)}
                                icon="Mail"
                                required='true'
                            />
                        </div>
                        <div className="campo-login">
                            <CampoTexto
                                label="Password"
                                placeholder="Digite sua senha"
                                type="password"
                                valor={password}
                                aoAlterado={valor => setPassword(valor)}
                                icon="Lock"
                                required='true'
                            />

                        </div>

                        <RemenberMe />
                        <div className="btn-login">
                            <Botao>
                                Entrar
                            </Botao>

                        </div>
                    </div>
                </form>

                <div className="rodapelogin" >
                    <Link to={'/user'} className="esqueceu-texto">Cadastro</Link>

                    <Link to={'/esqueceu-senha'} className="esqueceu-texto"> Esqueceu sua senha</Link>

                </div>
            </div>

        </section>
    )
}
export default Formulario