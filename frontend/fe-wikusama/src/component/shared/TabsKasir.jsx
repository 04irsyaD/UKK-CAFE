import React from "react";
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "./navbar.css";
// import exampleImage from "./logokasir.png"; 

const TABS_LINK = [
    {
        key: 'pemesanan',
        label: 'Pemesanan',
        path: '/',
    },

    {
        key: 'riwayat',
        label: 'Riwayat',
        path: '/riwayat',
    },
]

const linkClass = 'inline-block px-4 py-4 rounded-lg hover:bg-green-600'

export default function TabsKasir() {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
        window.location.reload()
    }
    return (
        <div class="navbar">
            <div className="flex flex-wrap text-sm font-medium text-center">
                {TABS_LINK.map((item) => (
                    <TabsLink key={item.key} item={item} />
                ))}
                 <a href="#" class="logout" onClick={handleLogout} >
                    logout
                 {/* <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"></path></svg> */}
            </a>
            </div>
            {/* <img class="logonav" src={exampleImage} alt="error"/> */}
        </div>
    )
}

function TabsLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-green-900 rounded-lg hover:bg-green-900' : '', linkClass)}>
            {item.label}
        </Link>
    )
}