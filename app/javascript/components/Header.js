import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid flex-wrapper">
                    <NavLink style={{ textDecoration: 'none', flex:2 }} to="/"><div className="navbar-brand">One TodoList</div></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{flex:6}}>
                        <li className="nav-item">
                            <NavLink style={{ textDecoration: 'none' }} to="/"><div className="nav-link" aria-current="page">Home</div></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{ textDecoration: 'none' }} to="/categories"><div className="nav-link">Categories</div></NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>            
        </div>

    )
}

export default Header