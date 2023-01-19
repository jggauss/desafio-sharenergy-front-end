import './IncluiCliente.css'
import { useState } from 'react'
import Botao from '../../Components/Botao'
import Menu from '../../Components/Menu'
import api from '../../Config/ConfigApi'
import MensagemErro from '../../Components/MensagemErro'
import MaskedInput from 'react-text-mask'
import Cabecalho from '../../Components/Cabecalho'
import { Link } from 'react-router-dom'
import * as yup from 'yup';


const IncluiCliente = (props) => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')
    const [estado, setEstado] = useState('')

    async function salvar(evento) {
        evento.preventDefault()
        setNome(nome)
        setEmail(email.toLocaleLowerCase())
        setCpf(cpf)
        setTelefone(telefone)
        setRua(rua)
        setNumero(numero)
        setBairro(bairro)
        setCidade(cidade)
        setCep(cep)
        setEstado(estado)
        const dados = {
            nome,
            email,
            cpf,
            telefone,
            rua,
            numero,
            bairro,
            cidade,
            cep,
            estado
        }
        if (!(await validarCliente())) return
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }


        await api.post('/cliente', dados,headers)
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                setNome("")
                setEmail("")
                setCpf("")
                setTelefone("")
                setRua("")
                setNumero("")
                setBairro("")
                setCidade("")
                setCep("")
                setEstado("")
            })
            .catch((erro) => {
                console.log(erro)
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }
    async function validarCliente() {
        let schema = yup.object().shape({
            estado:yup.string("Escolha um estado").required("Escolha um estado").min(2),
            cep:yup.string("Cep deve ter 8 números").required("Cep deve ter 8 números").min(8),
            cidade:yup.string("A cidade deve ter pelo menos 3 letras").required("A cidade deve ter pelo menos 3 letras").min(3),
            bairro:yup.string("O bairro deve ter pelo menos 3 letras").required("O bairro deve ter pelo menos 3 letras").min(3),
            numero:yup.string("O numero deve ter pelo menos 1 letras").required("O numero deve ter pelo menos 1 letras").min(1),
            rua:yup.string("A rua deve ter pelo menos 3 letras").required("A rua deve ter pelo menos 3 letras").min(3),
            cpf:yup.string("Cpf deve ter 11 números").required("Cpf deve ter 11 números").min(11),
            telefone:yup.string("O Telefone deve ter pelo menos 11 números").required("O Telefone deve ter pelo menos 11 números").min(11),
            email: yup.string("Deve ser digitado um email").required("Deve ser digitado um email").email(),
            nome: yup.string("O nome deve ter pelo menos 4 caracteres").required("O nome deve ter pelo menos 4 caracteres").min(4),
        })

        try {
            await schema.validate({
                nome: nome,
                email: email,
                cpf:cpf,
                telefone:telefone,
                cep:cep,
                rua,
                bairro,
                numero,
                cidade,
                estado

            })
            return true
        } catch (err) {
            console.log(err)
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
            <h1 className='titulo-pagina'>Cadastrar cliente</h1>
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
                        <label className='titulo'>Telefone</label>
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            guide={false}
                            value={telefone}
                            className='titulo'
                            type="text"
                            placeholder='Digite o melhor telefone do cliente'
                            //pattern="^[0-9]*[.,]?[0-9]*$"

                            onChange={(evento => setTelefone(evento.target.value))} />
                    </div>
                    <div className='campo-form-cliente'>
                        <label className='titulo'>CPF</label>
                        <MaskedInput
                            mask={([/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,])}
                            guide={false}
                            value={cpf}
                            className='titulo'
                            type="text"
                        
                            //pattern="^[0-9]*[.,]?[0-9]*$"
                            placeholder='Digite o CPF do cliente'
                            onChange={(evento => setCpf(evento.target.value))}
                            autoComplete="off"
                        />

                    </div>
                    <div className='endereco'>
                        <div>
                            <label className='titulo'>Rua</label>
                            <input
                                value={rua}
                                className='titulo'
                                type="text"
                                placeholder='Digite o logradouro (rua, avenida, travessa...) do cliente'
                                onChange={(evento => setRua(evento.target.value))} />
                            <label className='numero'>Número</label>
                            <input
                                value={numero}
                                className='numero'
                                type="text"
                                placeholder='Casa e/ou apartamento e bloco'
                                onChange={(evento => setNumero(evento.target.value))} />


                        </div>
                        <div>
                            <label className='titulo'>Bairro</label>
                            <input
                                value={bairro}
                                className='titulo'
                                type="text"
                                placeholder='Digite o Bairro'
                                onChange={(evento => setBairro(evento.target.value))} />
                        </div>
                        <div className='cidade' >

                            <label className='titulo'>Cidade</label>
                            <input
                                value={cidade}
                                className='titulo'
                                type="text"
                                placeholder='Digite a cidade '
                                onChange={(evento => setCidade(evento.target.value))} />

                            <label className='titulo'>CEP</label>
                            <MaskedInput
                                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
                                guide={false}
                                value={cep}
                                className='titulo-cep'
                                type="text"
                                placeholder='Digite o CEP'

                                onChange={(evento => setCep(evento.target.value))} />

                            <div className='titulo'>
                            <label>Estado</label>{ }
                            <div className='estado-selecao'>
                                <select name="status" className='titulo-estado' value={estado} onChange={texto => { setEstado(texto.target.value) }}>
                                <option value={""}>Selecione</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">Goiás</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">M.Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">R Janeiro</option>
                                <option value="RN">R G Norte</option>
                                <option value="RS">R G Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">S Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>

                            </select>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rodape'>
                    <div className='separa-rodape'>
                        <Botao>Cadastrar</Botao>
                    </div>
                    <div className='separa-rodape'>
                        <Botao>
                            <Link className='rodape-voltar' to="/clientes">Voltar</Link>
                        </Botao>

                    </div>
                </div>
            </form>
        </div >
    )
}
export default IncluiCliente