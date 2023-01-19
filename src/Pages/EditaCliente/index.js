import './EditaCliente.css'
import Menu from '../../Components/Menu'
import Cabecalho from '../../Components/Cabecalho'
import { useEffect, useState } from 'react'
import api from '../../Config/ConfigApi'
import { Link, useParams } from 'react-router-dom'
import Botao from '../../Components/Botao'
import MaskedInput from 'react-text-mask'
import * as yup from 'yup';
import MensagemErro from '../../Components/MensagemErro'



const EditaCliente = () => {

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



    const { _id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const GetCliente = async () => {
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }

        await api.get('/cliente/' + _id,headers)
            .then((response) => {
                setNome(response.data.nome)

                setEmail(response.data.email)
                setCpf(response.data.cpf)
                setTelefone(response.data.telefone)
                setRua(response.data.rua)
                setNumero(response.data.numero)
                setBairro(response.data.bairro)
                setCidade(response.data.cidade)
                setCep(response.data.cep)
                setEstado((response.data.estado).toUpperCase())
                setData(response.data)

            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }
    useEffect(() => {
        GetCliente()
    }, []
    )
    async function salvar(event) {
        event.preventDefault()
        console.log("salvei")
        
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

        await api.put('/cliente/'+_id,dados,headers)
        .then((response)=>{
            setStatus({
                type: 'success',
                message: response.data.message
            })
           
        })
        .catch((erro)=>{
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
        <div className='tela'>
            <Cabecalho />
            <Menu />
            <div className='centraliza-box'>
                <div className='tabela-consulta'>
                    <h1>Altera Cliente</h1>
                    <MensagemErro tipo={status.type} message={status.message} />
                    <form onSubmit={salvar}>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Nome :</label>
                            </div>
                            <input
                                value={nome}
                                className='titulo'
                                type="text"
                                placeholder='Digite o nome do cliente'
                                 onChange={(evento) => setNome(evento.target.value)}
                                autoFocus />
                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>E-mail :</label>
                            </div>
                            <input

                                value={email}
                                className='titulo'
                                type="text"
                                placeholder='Digite o melhor email do cliente'
                             onChange={(evento => setEmail(evento.target.value))} 
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Telefone : </label>
                            </div>
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                guide={false}
                                value={telefone}
                                className='titulo'
                                type="text"
                                placeholder='Digite o melhor telefone do cliente'
                             onChange={(evento => setTelefone(evento.target.value))} 
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>cpf : </label>
                            </div>
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
                                value={cpf}
                                guide={false}
                                className='titulo'
                                type="text"
                                placeholder='Digite o CPF do cliente'
                                onChange={(evento => setCpf(evento.target.value))}
                                autoComplete="off"
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Rua : </label>
                            </div>
                            <input
                                value={rua}
                                className='titulo'
                                type="text"
                                placeholder='Digite o logradouro (rua, avenida, travessa...) do cliente'
                             onChange={(evento => setRua(evento.target.value))} 
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Número : </label>
                            </div>
                            <input
                                value={numero}
                                className='titulo'
                                type="text"
                                placeholder='Casa e/ou apartamento e bloco'
                            onChange={(evento => setNumero(evento.target.value))} 
                            />


                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Bairro : </label>
                            </div>
                            <input
                                value={bairro}
                                className='titulo'
                                type="text"
                                placeholder='Digite o Bairro'
                            onChange={(evento => setBairro(evento.target.value))} 
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Cidade : </label>
                            </div>
                            <input
                                value={cidade}
                                className='titulo'
                                type="text"
                                placeholder='Digite a cidade '
                            onChange={(evento => setCidade(evento.target.value))} 
                            />

                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>CEP : </label>
                            </div>
                            <MaskedInput
                                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
                                guide={false}
                                value={cep}
                                className='titulo'
                                type="text"
                                placeholder='Digite o CEP'
                                onChange={(evento => setCep(evento.target.value))} 
                            />
                        </div>
                        <div className='linha-consulta'>
                            <div className='cor-campo'>
                                <label className='campo'>Estado</label>{ }
                            </div>
                            <div className='titulo'>
                                {estado}
                            </div>
                            <div className='escolhe-estado'>
                                <select name="estado"  className='titulo-estado'         onChange={texto => { setEstado(texto.target.value) }}>
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
                        <div className='rodape'>
                        <Botao>
                            Salvar
                        </Botao>
                        <Botao>
                            <Link className='inclui-cliente' to="/clientes">Voltar</Link>
                        </Botao>

                        </div>
                      
                    </form>
                </div>
            </div>
        </div>

    )
}
export default EditaCliente