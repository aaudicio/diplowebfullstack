//import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav > 
            <div>
                <ul>
                    <li><NavLink to="/" className = {({ isActive }) => isActive ? "activo" : undefined}
                    >Home</NavLink></li>
                    <li><NavLink to="/quiensoy" className = {({ isActive }) => isActive ? "activo" : undefined}
                    >QuienSoy</NavLink></li>
                    <li><NavLink to="/servicios" className = {({ isActive }) => isActive ? "activo" : undefined}
                    >Servicios</NavLink></li>
                    <li><NavLink to="/contacto" className = {({ isActive }) => isActive ? "activo" : undefined}
                    >Contacto</NavLink></li>
                </ul>
            </div>
        </nav>    
    )
}

export default Nav;