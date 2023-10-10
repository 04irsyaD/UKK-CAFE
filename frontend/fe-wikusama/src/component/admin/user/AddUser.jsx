import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddUser() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };

    const navigate = useNavigate()
    const [checkUsername, setCheckUsername] = useState([])

    //mengambil username untuk verifikasi
    useEffect(() => {
        const getUsername = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user/", {headers})
                const username = response.data.user.map(res => res.username)
                setCheckUsername(username)
            } catch (err) {
                console.log(err)
            }
        }
        getUsername()
    }, [])

    //penyimpanan data sementara sebelum di post ke database
    const [addUser, setAddUser] = useState({
        nama_user: "",
        role: "",
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setAddUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //post data ke database
    const handleClick = async e => {
        e.preventDefault()
        //verifikasi form kosong dan username yang sama
        if (checkUsername.includes(addUser.username.trim())) {
            toast.info("Username sudah terdaftar");
        } else {
            try {
                await axios.post("http://localhost:8000/user/add", addUser, {headers})
                navigate("/")
            } catch (err) {
                console.log(err)
            }
        }
    }

    const kembali = () => {
        navigate("/")
    }

    return (
        <div>
            <div className="mt-8 mx-16">
                <div className="bg-green-600 w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form onSubmit={handleClick}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8 mx-8">
                            <div>
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-white">Nama</label>
                                <input type="text" id="nama" className="text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="nama_user" onChange={handleChange} autoComplete="off" required />
                            </div>
                            <div>
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-white">Role</label>
                                <select id="role" className="text-sm rounded-lg block w-full p-2.5  bg-white  border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="role" onChange={handleChange} required>
                                    <option value="">Role</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="admin">Admin</option>
                                    <option value="manajer">Manager</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input type="text" id="username" className="text-sm rounded-lg block w-full p-2.5   bg-white   border-gray-600   placeholder-gray-400   text-black   focus:ring-blue-500   focus:border-blue-500" name="username" onChange={handleChange} autoComplete="off" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" id="password" className="text-sm rounded-lg block w-full p-2.5   bg-gray-700   border-gray-600   placeholder-gray-400   text-black   focus:ring-blue-500   focus:border-blue-500" name="password" onChange={handleChange} autoComplete="off" required />
                            </div>
                        </div>
                        <div>
                            <button onClick={kembali} className="ml-8 mr-2 mb-6 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Batal</button>
                            <button type="submit" className="mb-6 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">Simpan</button>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable={false}
                                pauseOnHover={false}
                                theme="light" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}