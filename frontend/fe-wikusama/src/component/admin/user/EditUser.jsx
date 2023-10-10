import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditUser() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };

    const navigate = useNavigate()
    const location = useLocation()

    //mengambil id user dari pathname
    const idUser = location.pathname.split("/")[2]
    
    const [prevData, setPrevData] = useState([])
    const [lastUsername, setLastUsername] = useState()

    const [checkUsername, setCheckUsername] = useState([])
    useEffect(() => {
        //mengambil username untuk verifikasi
        const getUsername = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user/", {headers})
                const username = response.data.user.map(res => res.username)
                setCheckUsername(username)
            } catch (err) {
                console.log(err)
            }
        }
        //mengambil data yang akan di update
        const getDataFromId = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/" + idUser, {headers})
                res.data.data.password = ""
                setPrevData(res.data.data)
                setLastUsername(res.data.data.username)
            } catch (err) {
                console.log(err)
            }
        }
        getDataFromId()
        getUsername()
    }, [])

    const handleChange = (e) => {
        setPrevData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //input data ke database
    const handleClick = async e => {
        e.preventDefault()

        if (prevData.username !== lastUsername && checkUsername.includes(prevData.username.trim())) {
            toast.info("Username sudah terdaftar");
        } else if (prevData.password === "") {
            toast.error("Password kosong!");
        } else {
            try {
                await axios.put("http://localhost:8000/user/" + idUser, prevData, {headers})
                navigate("/")
            } catch (err) {
                console.log(err)
            }
        }
    }

    const kembali = () => {
        navigate("/")
    }

    console.log(prevData)
    return (
        <div>
            <div className="mt-8 mx-16">
                <div className="bg-black w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form onSubmit={handleClick}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8 mx-8">
                            <div>
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-white">Nama</label>
                                <input required type="text" id="nama" className="text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="nama_user" value={prevData.nama_user || ""} onChange={handleChange} autoComplete="off" />
                            </div>
                            <div>
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-white">Role</label>
                                <select required id="role" className="text-sm rounded-lg block w-full p-2.5  bg-white  border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" value={prevData.role || ""} name="role" onChange={handleChange} >
                                    <option value="">Role</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="admin">Admin</option>
                                    <option value="manajer">manajer</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input required type="text" id="username" className="text-sm rounded-lg block w-full p-2.5   bg-white   border-gray-600   placeholder-gray-400   text-black   focus:ring-blue-500   focus:border-blue-500" value={prevData.username || ""} name="username" onChange={handleChange} autoComplete="off" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" id="password" className="text-sm rounded-lg block w-full p-2.5   bg-white   border-gray-600   placeholder-gray-400   text-black   focus:ring-blue-500   focus:border-blue-500"  name="password" onChange={handleChange} autoComplete="off" />
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