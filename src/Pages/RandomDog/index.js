/* eslint-disable jsx-a11y/iframe-has-title */
import './RandomDog.css'
import Menu from '../../Components/Menu'
import Botao from "../../Components/Botao";
import Cabecalho from '../../Components/Cabecalho';
import { Link } from 'react-router-dom';
const RandomDog = () => {
    function refresh(event) {
        event.preventDefault()
    }

    return (
        <div>
            <Cabecalho />
            <Menu />
            <div className='tabela-randomdog'>
                <h1>RandomDog</h1>
                <div className='principal'>
                    <div className='separa'>

                        <iframe
                            src="https://random.dog"
                            title='Olá'
                            width="600"
                            height="600"
                            frameBorder="0"
                            allowed="accelerometer,autoplay,muted"
                        ></iframe>
                    </div>
                    <div className='separa'>
                        <form className='divide-tela'>

                        <button className="rodape" onClick={() => refresh()}> Refresh</button>
                        <Link to="/home"><button className='rodape'>Volta</button></Link>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default RandomDog