import './MensagemErro.css'

const MensagemErro = (props) => {
    return (
        <div className='erro'>
            {props.tipo === 'success' ? <span  className='success'>{props.message}</span> : ''}
            {props.tipo === 'error' ? <span  className='error'>{props.message}</span> : ''}
        </div>
    )
}
export default MensagemErro



