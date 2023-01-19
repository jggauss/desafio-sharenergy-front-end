import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../Context/AuthContext'
import './Menu.css'

const Menu = (props) => {
    const { handleLogout } = useContext(Context)
    return (
        <div className="menu-principal">
        <Link className='item-menu' to='/home'>Home </Link>    
        <Link className='item-menu' to='/status'>Status </Link>
        <Link className='item-menu' to='/randomdog'>RandomDog</Link>
        <Link className='item-menu' to='/clientes'>Clientes</Link>
        <Link className='item-menu' to='/' onClick={handleLogout}>Sair</Link>
        
    </div>

    )
}
export default Menu