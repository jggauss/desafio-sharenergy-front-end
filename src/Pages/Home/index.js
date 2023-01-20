import './Home.css'
import React, { useEffect, useState } from 'react'
import api from '../../Config/ConfigApi'
import MensagemErro from '../../Components/MensagemErro'
import Menu from '../../Components/Menu'
import Cabecalho from '../../Components/Cabecalho'
import ConsultaCliente from '../ConsultaCliente'

const Home = () => {
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const [pesquisa, setPesquisa] = useState('')
    const [page, setPage] = useState('')
    const [data, setData] = useState([])
    const [lastPage, setLastPage] = useState('')


    const GetUsers = async (page) => {
        if (page === undefined) {
            page = 1
        }
        setPage(page)
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }


        await api.get('/users/' + page + "/", headers)
            .then((response) => {
                if(Number(response.data.countUser)===0){
                    
                    return setStatus({
                        type: 'error',
                        message: "Não há usuários cadastrados"
                    })
                }
                setData(response.data.users)
                setLastPage(response.data.lastPage)
                setStatus({
                    type: 'success',
                    message: response.data.message
                })

                return setData(response.data.users)
            })
            .catch((erro) => {

                if (erro.response) {
                    setStatus({
                        type: 'error',
                        message: erro.response.data.message
                    })
                } else {
                    setStatus({
                        type: 'error',
                        message: "Erro. Tente mais tarde"
                    })
                }

            })

        if (pesquisa.length > 0) {
            await api.get('/users/' + page + "/" + pesquisa, headers)
                .then((response) => {
                    
                    setData(response.data.users)
                    setLastPage(response.data.lastPage)
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })

                    return setData(response.data.users)
                })
                .catch((erro) => {

                    if (erro) {
                        setStatus({
                            type: 'error',
                            message: erro.response.data.message
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            message: "Erro. Tente mais tarde"
                        })
                    }

                })
        }
    }

    useEffect(() => {

        GetUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pesquisa])

    return (
        <div className='home'>
            <Cabecalho />
            <Menu />
            <div className='tabela-home'>
                <h1>Usuários</h1>
                <div>
                    <label className='pesquisa'>Pesquisa : </label>
                    <input type="text" value={pesquisa} onChange={(evento) => setPesquisa(evento.target.value)} autoFocus />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>E-mail</th>
                            <th>Username</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dado) => (
                            <tr key={dado._id}>
                                {dado.length > 0 ? data : null}
                                <td >
                                    <img className='foto-usuario' src={dado.foto} alt="foto do usuário" />
                                </td>

                                <td className='item-usuario'>{dado.name}</td>
                                <td className='item-usuario'>{dado.idade}</td>
                                <td className='item-usuario'>{dado.email}</td>
                                <td className='item-usuario'>{dado.userName}</td>
                            </tr>
                        ))}
                        <tr></tr>
                    </tbody>
                </table>

                <MensagemErro tipo={status.type} message={status.message} />

                <div >
                    {page !== 1 ? <button className='cor-btn' type='button' onClick={() => GetUsers(1)}>Primeira</button> : <button className='cor-btn-desligado' disabled>Primeira</button>}
                    {page !== 1 ? <button className='cor-btn'  type='button' onClick={() => GetUsers(page - 1)}>{page - 1}</button> : ""}
                    <button className='cor-btn-desligado'  disabled type='button'>{page}</button>
                    {page + 1 < lastPage ? <button className='cor-btn'  type='button' onClick={() => GetUsers(page + 1)} >{page + 1}</button> : ""}

                    {page !== lastPage -1? <button className='cor-btn'  type='button' onClick={() => GetUsers(lastPage - 1)}>Ultíma</button> : <button  className='cor-btn-desligado' disabled>Ultíma</button>}
                </div>
            </div>
        </div>

    )
}
export default Home