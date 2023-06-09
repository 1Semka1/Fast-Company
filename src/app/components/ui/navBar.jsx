import React from 'react'
import { Link } from 'react-router-dom'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const NavBar = () => {
    const isLoggetIn = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">
                            Main
                        </Link>
                    </li>
                    {isLoggetIn && (
                        <li className="nav-item">
                            <Link
                                to="/users"
                                className="nav-link active"
                                aria-current="page"
                            >
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggetIn ? (
                        <NavProfile />
                    ) : (
                        <Link
                            to="/login"
                            className="nav-link active"
                            aria-current="page"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
