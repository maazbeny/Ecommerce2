
import './Navbar.css'
import React, { useContext, useRef, useState } from 'react'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext)
    const [menu, setMenu] = useState("shop")
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav_menu_visible')
        e.target.classList.toggle('open')
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <h1>LIBAS</h1>
            </div>
            <img className="nav_dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav_menu">
                <li onClick={() => { setMenu("shop") }} > <Link style={{ textDecoration: 'none' }} to='/'>Shop </Link> {menu === "shop" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("men") }}> <Link style={{ textDecoration: 'none' }} to='/men'>Men </Link> {menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none' }} to='/women'>Women </Link> {menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids </Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/login'><button>Login</button> </Link>}

                <Link to='/cart'><img src={cart_icon} alt="" /> </Link>

                <div className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
            </div>
        </div>
    )
}

export default Navbar