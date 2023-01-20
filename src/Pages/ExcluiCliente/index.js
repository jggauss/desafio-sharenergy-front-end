import './ExcluiCliente.css'
import Menu from '../../Components/Menu'
import Cabecalho from '../../Components/Cabecalho'
import { useEffect, useState } from 'react'
import api from '../../Config/ConfigApi'
import { Link, Navigate, useParams } from 'react-router-dom'
import Botao from '../../Components/Botao'


const ExcluiCliente = () => {
    const { _id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const GetCliente = async () => {
        await api.get('/cliente/' + _id)

            .then((response) => {
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
    async function deletaCliente(_id) {
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }

        await api.delete('/cliente/' + _id,headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                setData(response.data)
            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })

    }

    return (
        <div className='tela'>
            <Cabecalho />
            <Menu />
            <div className='centraliza-box'>


                <div className='tabela-consulta'>
                    <h1>Exclui Cliente</h1>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Nome :</div>
                        </div>

                        <div className='valor'>{data.nome}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>E-mail :</div>
                        </div>
                        <div className='valor'>{data.email}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Telefone : </div>
                        </div>
                        <div className='valor'>{data.telefone}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>cpf : </div>
                        </div>
                        <div className='valor'>{data.cpf}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Rua : </div>
                        </div>
                        <div className='valor'>{data.rua}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Número : </div>
                        </div>
                        <div className='valor'>{data.numero}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Bairro : </div>
                        </div>
                        <div className='valor'>{data.bairro}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Cidade : </div>
                        </div>
                        <div className='valor'>{data.cidade}</div>

                    </div>

                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>CEP : </div>
                        </div>
                        <div className='valor'>{data.cep}</div>
                    </div>

                    <div className='linha-consulta'>
                        <div className='cor-campo'>
                            <div className='campo'>Estado : </div>
                        </div>
                        <div className='valor'>{data.estado}</div>

                    </div>
                    <div className='confirma-exclusao'>

                        <Botao>
                            <Link className='exclui-cliente' to="#" onClick={() => deletaCliente(_id)}>Exclusão</Link>
                        </Botao>
                        <Botao>
                            <Link className='exclui-cliente' to="/clientes">Cancela</Link>
                        </Botao>



                        {status.type === "success" ? (<Navigate to="/clientes" state={status} />) : ("")}
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ExcluiCliente