import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./bgpemesanan.css";

function splitPath(path) {
    const respath = path.split('\\')
    return respath[0] + "/" + respath[1] + "/" + respath[2]
}
let headers = {}
export default function Pemesanan() {
    useEffect(() => {
        headers = {
            'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
        };
    }, [])

    const navigate = useNavigate()
    const [menu, setMenu] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [pesanan, setPesanan] = useState([])
    const totalPrice = pesanan.reduce((total, item) => {
        return total + (item.harga * item.qty);
    }, 0)
    const totalQty = pesanan.reduce((qty, item) => {
        return qty + (item.qty);
    }, 0)
    const [id_menu, setIdMenu] = useState("")
    const [meja, setMeja] = useState([]);
    const [selectedMeja, setSelectedMeja] = useState("");
    const selectedOption = meja.find((option) => option.nomor_meja === selectedMeja)

    const [namaPelanggan, setNamaPelanggan] = useState("")
    const [alamat, setAlamat] = useState("")

    const [detail_transaksi, setDetailTransaksi] = useState([])

    useEffect(() => {
        const fecthDatas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/menu/", { headers })
                console.log(response);
                const qty = response.data.data.map(res => res.qty = 0)
                setMenu(response.data.data, qty)

                const responseMeja = await axios.get("http://localhost:8000/meja/", { headers })
                console.log(responseMeja);
                setMeja(responseMeja.data.data)

            } catch (err) {
                console.log(err)
            }
        }

        fecthDatas()
    }, [])


    function handleIncreaseClick(id_menu) {
        setIdMenu(id_menu)
        setMenu(menu.map(menu => {
            if (menu.id === id_menu) {
                return { ...menu, qty: menu.qty + 1 };
            } else {
                return menu;
            }
        }))
    }

    function handleDecreaseClick(id_menu) {
        setIdMenu(id_menu)
        setMenu(menu.map(menu => {
            if (menu.id === id_menu) {
                if (menu.qty <= 0) {
                    return menu
                } else {
                    return { ...menu, qty: menu.qty - 1 };
                }
            } else {
                return menu;
            }
        }))
    }

    const checkPemesanan = () => {
        var pesanan = menu.filter(x => x.qty > 0)
        setPesanan(pesanan)

        setDetailTransaksi(pesanan.map(detail => {
            const { id_menu, harga, qty } = detail;
            return {
                id_menu,
                qty,
                subtotal: harga * qty
            };
        }))

        if (selectedOption === undefined) {
            toast.info("belum mengisi")
        } else if (pesanan.length === 0) {
            toast.info("Pesanan kosong")
        } else
            setShowModal(true)
    }


    const removePesanan = (id_menu) => {
        setPesanan(pesanan.filter(pesanan => {
            return pesanan.id_menu !== id_menu
        }))

        setMenu(menu.map(menu => {
            if (menu.id === id_menu) {
                return { ...menu, qty: 0 };
            } else {
                return menu;
            }
        }))
    }

    const handleSelectChange = (e) => {
        setSelectedMeja(e.target.value);
    };

    const handleNamaPelanggan = (e) => {
        setNamaPelanggan(e.target.value)
    }

    const handleAlamat = (e) => {
        setAlamat(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data_transaksi = {
            id_user: sessionStorage.getItem("id_user"),
            tgl_transaksi: new Date(),
            id_meja: selectedOption.id,
            nama_pelanggan: namaPelanggan,
            alamat: alamat,
            status: "belum_bayar",
            total: totalPrice,
            qty:totalQty,
            detail_transaksi,
            totalQty,
            id_menu,
            totalPrice
        }

        const updatedStatusMeja = {
            ...selectedOption,
            status: "tidak_tersedia"
        }

        try {
            await axios.post("http://localhost:8000/transaksi/add", data_transaksi, { headers });
            await axios.put("http://localhost:8000/meja/" + selectedOption.id, updatedStatusMeja, { headers })
            navigate('/riwayat')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class="backgroundd">
            <div className='fixed top-0 w-full pointer-events-none'>
                <select onChange={handleSelectChange} className="pointer-events-auto text-sm rounded-lg block p-2.5 bg-blue-900 my-24 mx-8 float-right py-3 placeholder-gray-400 text-white focus:ring-sky-900 focus:border-sky-900">
                    <option value="">Pilih meja pelanggan</option>
                    {meja.map((option) => (
                        <option
                            key={option.id_meja}
                            value={option.nomor_meja}
                            disabled={option.status === "tidak_tersedia"}
                        >
                            Meja nomor {option.nomor_meja}
                        </option>
                    ))}
                </select>
            </div>

            {/* {*makanan*} */}
            <div>
                <h6 className="pointer-events-auto bottom-0 my-8 mx-8 float-left inline-block px-10 py-3 rounded-lg bg-blue-900 text-white">Makanan -</h6>
                <div className="flex flex-wrap gap-5 mt-5 ml-5">
                    {menu.map((menu) => {
                        if (menu.jenis === 'makanan') {
                            return (
                                <div key={menu.id} class="gambar">
                                    <img className="w-80 h-60 p-8 rounded-t-lg" src={`http://localhost:8000/foto/${menu.gambar}`} alt="product" />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{menu.nama_menu}</h5>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900">{menu.harga}</span>
                                            <div className="inline-flex rounded-md" role="group">
                                                <button onClick={() => handleDecreaseClick(menu.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ">
                                                    -
                                                </button>
                                                <input type="text" className=" text-center py-2 text-sm font-medium text-gray-900 w-14 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2" value={menu.qty} disabled />
                                                <button onClick={() => handleIncreaseClick(menu.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } return null
                    })}
                </div>

                {/* {*minuman*} */}
                <h6 className="pointer-events-auto bottom-0 my-8 mx-8 float-left inline-block px-10 py-3 rounded-lg bg-blue-900 text-white">Minuman -</h6>
                <div className="flex flex-wrap gap-5 mt-5 ml-5">
                    {menu.map((menu) => {
                        if (menu.jenis === 'minuman') {
                            return (
                                <div key={menu.id} class="gambar">
                                    <img className="w-80 h-60 p-8 rounded-t-lg" src={`http://localhost:8000/foto/${menu.gambar}`} alt="product" />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{menu.nama_menu}</h5>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900">{menu.harga}</span>
                                            <div className="inline-flex rounded-md" role="group">
                                                <button onClick={() => handleDecreaseClick(menu.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ">
                                                    -
                                                </button>
                                                <input type="text" className=" text-center py-2 text-sm font-medium text-gray-900 w-14 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2" value={menu.qty} disabled />
                                                <button onClick={() => handleIncreaseClick(menu.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } return null
                    })}
                </div>
            </div>
            <div className='fixed bottom-0 w-full pointer-events-none'>
                <button onClick={checkPemesanan} className='pointer-events-auto bottom-0 my-8 mx-8 float-right inline-block px-10 py-3 rounded-lg bg-blue-900 text-white'>Simpan</button>
            </div>


            {/* {*input after simpan*} */}
            {showModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                            <div class="checkout">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <p className="text-lg font-medium text-gray-900">Pesanan Meja nomor {selectedMeja}</p>
                                        <button onClick={() => setShowModal(false)} type="button" className=" absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {pesanan.map((product) => (
                                                    <li key={product.id_menu} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={`http://localhost:8000/foto/${product.gambar}`}
                                                                alt="product"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <p>{product.nama_menu}</p>
                                                                    </h3>
                                                                    <p className="ml-4">{product.harga * product.qty}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.jenis}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty {product.qty}</p>

                                                                <div className="flex">
                                                                    <button onClick={() => removePesanan(product.id_menu)} type="button" className="font-medium text-green-900 hover:text-green-800">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-3 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total</p>
                                        <p>{totalPrice}</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div>
                                        <label htmlFor="pelanggan" className="flex justify-between text-base font-medium text-gray-900">Nama Pelanggan</label>
                                        <input onChange={handleNamaPelanggan} value={namaPelanggan} type="text" id="pelanggan" className="text-sm rounded-lg block w-full p-2.5 bg-transparent border border-gray-200 text-gray-900" autoComplete="off" required />
                                    </div>
                                    <div>
                                        <label htmlFor="alamat" className="flex justify-between text-base font-medium text-gray-900">Alamat</label>
                                        <input onChange={handleAlamat} value={alamat} type="text" id="alamat" className="text-sm rounded-lg block w-full p-2.5 bg-transparent border border-gray-200 text-gray-900" autoComplete="off" required />
                                    </div>
                                    <div className="mt-6">
                                        <button type="submit" className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-400">
                                            Checkout
                                        </button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <button type="button" className="font-medium text-green-900 hover:text-green-800" onClick={() => setShowModal(false)}>
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
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
    )
}