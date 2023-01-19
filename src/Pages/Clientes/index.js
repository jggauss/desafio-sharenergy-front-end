import './Clientes.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Botao from '../../Components/Botao'
import MensagemErro from '../../Components/MensagemErro'
import Menu from '../../Components/Menu'
import api from '../../Config/ConfigApi'
import Cabecalho from '../../Components/Cabecalho'
//import Botao from "../../Components/Botao";
const Clientes = () => {
    var { state } = useLocation()
    const [data, setData] = useState([])
    const [page, setPage]= useState('')
    const [lastPage,setLastPage]= useState('')
    const [status, setStatus] = useState({
        type: state ? state.type : '',
        message: state ? state.message : ''
    })

    const GetClientes = async (page) => {
        if(page===undefined){
            page=1
        }
        setPage(page)
        
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }
        await api.get('/clientes/'+page,headers)
            .then((response) => {
                setData(response.data.clientes)
                setLastPage(response.data.lastPage)
            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }

    useEffect(() => {
        GetClientes()
    }, [])
    return (
        <div>
            <Cabecalho />
            <Menu />

            <table className='tabela'>
                <div className='sub-cabecalho'>
                    <div>
                        <h1>Clientes</h1>
                    </div>

                    <div className='btn-sub-cabecalho'>
                    <div className='separa-rodape'>
                            <Botao className="tamanho">
                                <Link className='inclui-cliente' to='/clientes/inclui'>Incluir</Link>
                            </Botao>

                        </div>
                        <div className='separa-rodape'>
                            <Botao>
                                <Link className='inclui-cliente' to="/home">Voltar</Link>
                            </Botao>

                        </div>

                    </div>
                </div>
                <MensagemErro tipo={status.type} message={status.message} />
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Ação</th>

                    </tr>
                </thead>
                <tbody className='tabela-clientes'>
                    {data.map((dado) => (
                        <tr key={dado._id}>
                            {dado.length > 0 ? data : null}
                            <td className='item-tabela-cliente'>{dado.nome}</td>
                            <td className='item-tabela-cliente'>{dado.email}</td>
                            <td className='item-tabela-cliente'>{dado.cpf}</td>
                            <td className='item-tabela-cliente'>{dado.telefone}</td>
                            <div className='acoes'>
                                <Link className='edita' to={'/clientes/consulta/' + dado._id}>Consulta</Link>
                                <Link className='altera' to={'/clientes/edita/' + dado._id}>Altera</Link>
                                <Link className='exclui' to={'/clientes/exclui/' + dado._id}>Exclui</Link>
                            </div>
                        </tr>
                    ))}
                    <tr></tr>
                </tbody>
                <div >
                    {page !== 1 ? <button className='cor-btn' type='button' onClick={() => GetClientes(1)}>Primeira</button> : <button className='cor-btn-desligado' disabled>Primeira</button>}
                    {page !== 1 ? <button className='cor-btn'  type='button' onClick={() => GetClientes(page - 1)}>{page - 1}</button> : ""}
                    <button className='cor-btn-desligado'  disabled type='button'>{page}</button>
                    {page + 1 <= lastPage ? <button className='cor-btn'  type='button' onClick={() => GetClientes(page + 1)} >{page + 1}</button> : ""}

                    {page !== lastPage -1? <button className='cor-btn'  type='button' onClick={() => GetClientes(lastPage)}>Ultíma</button> : <button  className='cor-btn-desligado' disabled>Ultíma</button>}
                </div>
            </table>




        </div>

    )
}
export default Clientes