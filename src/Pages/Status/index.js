import React, { useEffect, useState } from "react";
import Cabecalho from "../../Components/Cabecalho";
import Menu from '../../Components/Menu'
import Botao from "../../Components/Botao";
import './Status.css'
import { Link } from "react-router-dom";
const Status = () => {
    const [exibe, setExibe] = useState('200')
    const [temp, setTemp] = useState("")
   
    const MostraStatus = async () => {
        
       
        setExibe("https://http.cat/" + temp + '.jpg')
    }


    useEffect(() => {
        setTemp(temp)


        
        MostraStatus()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temp])



    return (
        <div>
            <Cabecalho />
            <Menu />
            <div className="tabela-status">


                <h1>Status</h1>
                <form onSubmit={MostraStatus}>
                    <div className="divide-status">

                        <div className="separa">
                            <label className="status">Escolha o status</label>{ }
                            <select className="escolha" name="status" value={temp} onChange={texto => { setTemp(texto.target.value) }}>
                                <option value={""}>Selecione</option>
                                <option value="100">Continue</option>
                                <option value="101">Switching Protocols</option>
                                <option value="102">Processing</option>
                                <option value="103">Early Hints</option>
                                <option value="200">Ok</option>
                                <option value="201">Created</option>
                                <option value="202">Accepted</option>
                                <option value="204">No Content</option>
                                <option value="206">Partial Content</option>
                                <option value="207">Multi-Status</option>
                                <option value="300">Multiple Choices</option>
                                <option value="301">Moved Permanently</option>
                                <option value="302">Found</option>
                                <option value="303">See Other</option>
                                <option value="304">Pagamento requerido</option>
                                <option value="305">Use Proxy</option>
                                <option value="307">Temporary Redirect</option>
                                <option value="308">Permanent Redirect</option>
                                <option value="400">Bad Request</option>
                                <option value="401">Unauthorized</option>
                                <option value="402">Payment Required</option>
                                <option value="403">Forbidden</option>
                                <option value="404">Not Found</option>
                                <option value="405">Method Not Allowed</option>
                                <option value="406">Not Acceptable</option>
                                <option value="407">Proxy Authentication Required</option>
                                <option value="408">Request Timeout</option>
                                <option value="409">Conflict</option>
                                <option value="410">Gone</option>
                                <option value="411">Length Required</option>
                                <option value="412">Precondition Failed</option>
                                <option value="413">Payload Too Large</option>
                                <option value="414">Request-URI Too Long</option>
                                <option value="415">Unsupported Media Type</option>
                                <option value="416">Request Range Not Satisfiable</option>
                                <option value="417">Expectation Failed</option>
                                <option value="418">I’m a teapot</option>
                                <option value="420">Enhance Your Calm</option>
                                <option value="421">Misdirected Request</option>
                                <option value="422">Unprocessable Entity</option>
                                <option value="423">Locked</option>
                                <option value="424">Failed Dependency</option>
                                <option value="425">Too Early</option>
                                <option value="500">Internal Server Error</option>
                                <option value="501">Not Implemented</option>
                                <option value="502">Bad Gateway</option>
                                <option value="503">Service Unavailable</option>


                            </select>
                        </div>
                        <div className="rodape">
                            <Botao>
                                <div>
                                    <Link className="btn"  to="/clientes" >  Voltar</Link>
                                </div>
                            </Botao>

                        </div>
                    </div>
                </form>
                <img src={exibe} alt="" />
            </div>
        </div>

    )
}
export default Status