import './IncluiUser.css'
import { useState } from 'react'
import Botao from '../../Components/Botao'
import Menu from '../../Components/Menu'
import api from '../../Config/ConfigApi'
import MensagemErro from '../../Components/MensagemErro'
import MaskedInput from 'react-text-mask'
import Cabecalho from '../../Components/Cabecalho'
import { Link } from 'react-router-dom'
import * as yup from 'yup';



const moment = require("moment");


const IncluiUser = (props) => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [password,setPassword] = useState('')


    async function salvar(evento) {
        evento.preventDefault()
        setNome(nome)
        setEmail(email.toLocaleLowerCase())
        setUserName(userName)
        setDataNascimento(dataNascimento)
        setPassword(password)

        const dados = {
            nome,
            email,
            userName,
            dataNascimento,
            password: password,
            foto: "https://randomuser.me/api/portraits/med/women/53.jpg"
            
        }
        //var dataDeHoje = moment(new Date()).format("DD/MM/YYYY")
        if (!(await validarUsuario())) return
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }
        await api.post('/user', dados, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                setNome("")
                setEmail("")
                setUserName("")
                setDataNascimento("")

            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }
    async function validarUsuario() {
        let schema = yup.object().shape({

            //dataNascimento: yup.string("Digite uma data váida").required("Digite uma data váida").max(moment(new Date()).format("DD/MM/YYYY")),
            password: yup.string("A senha deve ter pelo menos 6 caracteres").required("A senha deve ter pelo menos 6 caracteres").min(6),
            userName: yup.string("Username deve ter 4 números").required("Username deve ter 4 números").min(4),
            email: yup.string("Deve ser digitado um email").required("Deve ser digitado um email").email(),
            nome: yup.string("O nome deve ter pelo menos 4 caracteres").required("O nome deve ter pelo menos 4 caracteres").min(4),
        })

        try {
            await schema.validate({
                nome: nome,
                email: email,
                userName: userName,
                password:password,
                //dataNascimento: dataNascimento


            })
            return true
        } catch (err) {
            setStatus({
                type: "error",
                message: err.errors,
            });
            return false
        }

    }

    return (
        <div>
            <Cabecalho />
            <Menu />
            <h1 className='titulo-pagina'>Cadastrar usuário</h1>
            <MensagemErro tipo={status.type} message={status.message} />
            <form onSubmit={salvar}>
                <div className='form-cliente'>
                    <div className='campo-form-cliente'>

                        <label className='titulo'>Nome</label>
                        <input
                            value={nome}
                            className='titulo'
                            type="text"
                            placeholder='Digite o nome do cliente'
                            onChange={(evento) => setNome(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-cliente'>
                        <label className='titulo'>E-mail</label>
                        <input
                            value={email}
                            className='titulo'
                            type="text"
                            placeholder='Digite o melhor email do cliente'
                            onChange={(evento => setEmail(evento.target.value))} />

                    </div>
                    <div className='campo-form-cliente'>

                        <label className='titulo'>UserName</label>
                        <input
                            value={userName}
                            className='titulo'
                            type="text"
                            placeholder='Digite o username do cliente'
                            onChange={(evento) => setUserName(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-cliente'>

                        <label className='titulo'>Senha</label>
                        <input
                            value={password}
                            className='titulo'
                            type="text"
                            placeholder='Digite o username do cliente'
                            onChange={(evento) => setPassword(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-cliente'>

                        <label className='titulo'>Data de nascimento</label>
                        <input
                            value={dataNascimento}
                            className='titulo'
                            type="date"
                            placeholder='Digite o username do cliente'
                            onChange={(evento) => setDataNascimento(evento.target.value)}
                            autoFocus />

                    </div>




                    <div className='campo-form-cliente'>
                    </div>
                    <div className='rodape'>
                        <div className='separa-rodape'>
                            <Botao>Cadastrar Usuário</Botao>
                        </div>
                        <div className='separa-rodape'>
                            <Botao>
                                <Link className='rodape-voltar' to="/clientes">Voltar</Link>
                            </Botao>

                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}
export default IncluiUser