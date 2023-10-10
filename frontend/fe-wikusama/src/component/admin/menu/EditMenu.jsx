import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditMenu() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };
    const navigate = useNavigate()
    const location = useLocation()

    //mengambil id user dari pathname
    const idMenu = location.pathname.split("/")[2]

    const [checkMenu, setCheckMenu] = useState([])
    const [selectImage, setSelectImage] = useState(null)
    const [prevData, setPrevData] = useState([])
    const [lastMenuName, setLastMenuName] = useState([])

    //mengambil menu untuk verifikasi
    useEffect(() => {
        //mengambil nama menu untuk verifikasi
        const getMenu = async () => {
            try {
                const response = await axios.get("http://localhost:8000/menu/", {headers})
                const nama = response.data.data.map(res => res.nama_menu)
                setCheckMenu(nama)
                console.log(nama)
            } catch (err) {
                console.log(err)
            }
        }
        //mengambil data yang akan di update
        const getDataFromId = async () => {
            try {
                const res = await axios.get("http://localhost:8000/menu/" + idMenu, {headers})
                setPrevData(res.data.data)
                setLastMenuName(res.data.data.nama_menu)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getDataFromId()
        getMenu()
    }, [])

    console.log(prevData)
    console.log(lastMenuName)

    const handleChange = (e) => {
        setPrevData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //post data ke database
    const handleClick = async e => {
        try{
            e.preventDefault()
            if (prevData.nama_menu !== lastMenuName && checkMenu.includes(prevData.nama_menu.trim())) {
                toast.info("Nama menu sudah terdaftar");
            } else {
                let data = new FormData()
                data.append('nama_menu', prevData.nama_menu)
                data.append('jenis', prevData.jenis)
                data.append('deskripsi', prevData.deskripsi)
                data.append('gambar', selectImage)
                data.append('harga', prevData.harga)
                await axios.put("http://localhost:8000/menu/" + idMenu, data, {headers})
                navigate("/menu")
            }
        } catch (err){
            console.log(err)
        }
    }

    const kembali = () => {
        navigate("/menu")
    }

    return (
        <div>
            <div className="mt-8 mx-16">
                <div className="bg-green-600 w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form onSubmit={handleClick}>
                        <div className="grid gap-6 mb-4 md:grid-cols-2 mt-8 mx-8">
                            <div>
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-white">Nama Menu</label>
                                <input value={prevData.nama_menu || ""} required type="text" id="nama" className="text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="nama_menu" onChange={handleChange} autoComplete="off" />
                            </div>
                            <div>
                                <label htmlFor="harga" className="block mb-2 text-sm font-medium text-white">Harga</label>
                                <input value={prevData.harga || ""} required type="text" onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} id="harga" className="text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="harga" onChange={handleChange} autoComplete="off" />
                            </div>
                        </div>
                        <div className="mx-8 mb-6">
                            <div className="mb-4">
                                <label htmlFor="jenis" className="block mb-2 text-sm font-medium text-white">Jenis</label>
                                <select value={prevData.jenis || ""} required id="jenis" className="text-sm rounded-lg block w-full p-2.5  bg-white  border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" name="jenis" onChange={handleChange} >
                                    <option value="">Jenis</option>
                                    <option value="makanan">Makanan</option>
                                    <option value="minuman">Minuman</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-white" htmlFor="file">Upload gambar</label>
                                <input className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-white border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="file" type="file" name="gambar" accept="image/" onChange={e => setSelectImage(e.target.files[0])} />
                            </div>
                            <div>
                                <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                                <textarea value={prevData.deskripsi || ""} required name="deskripsi" onChange={handleChange} id="deskripsi" rows="4" className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                            </div>
                        </div>
                        <div>
                            <button onClick={kembali} className="ml-8 mr-2 mb-6 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Batal</button>
                            <button type="submit" className="mb-6 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-green-700 focus:ring-green-800">Simpan</button>
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