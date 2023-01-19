import './login.css'
const CampoTexto = (props) => {
    const aoDigitado = (evento)=>{
        props.aoAlterado(evento.target.value)
    }
    console.log(props.aoAlterado)


    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <div className='linha-entrada-login'>
                <span className="material-symbols-outlined">{props.icon}</span>
                <input 
                type={props.type} 
                value={props.valor} 
                onChange={aoDigitado} 
                placeholder={`${props.placeholder}...`} 
                autoComplete="off"
                required= {props.required}
                />
                
            </div>


        </div>
    )
}
export default CampoTexto