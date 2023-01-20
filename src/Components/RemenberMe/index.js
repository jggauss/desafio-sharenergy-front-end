import { useEffect, useState } from 'react'
import GetCookie from '../../Hook/getCookie'
import SetCookie from '../../Hook/setCookie'
import RemoveCookie from '../../Hook/removeCookie'
import './RememberMe.css'
const RemenberMe = (props) => {

    var confere = GetCookie('remember')
    
    const[olha,setOlha] = useState(confere)

    function trocaEstado(){
        var olha2 = !olha
        SetCookie('remember',olha2)
        setOlha(olha2)
        RemoveCookie('userName')
        RemoveCookie('password')
        confere = GetCookie('remember')

    }
   useEffect(()=>{
    var meleca = GetCookie('remember')
    setOlha(meleca)

},[confere,olha])
    return (
        <div className="remenberme">
            <input type="checkbox" checked={olha} onChange={trocaEstado} />
            <label>Remember me</label>
        </div>
    )
}
export default RemenberMe