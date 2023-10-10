import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DataTransaksi() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };
    const [transaksi, setTransaksi] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [searchEmployee, setSearchEmployee] = useState('');
    const [filteredTransaksi, setFilteredTransaksi] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/transaksi/", { headers });
                setTransaksi(response.data.data);
                setFilteredTransaksi(response.data.data); // Inisialisasi filteredTransaksi dengan semua data
            } catch (err) {
                console.log(err);
            }
        };
        fetchDatas();
    }, []);

    const filterByDate = (date) => {
        setSelectedDate(date);

        const filteredData = transaksi.filter((t) => {
            const tgl_transaksi = new Date(t.tgl_transaksi);
            const isDateMatch = date ? tgl_transaksi.toDateString() === date.toDateString() : true;
            const isEmployeeMatch = searchEmployee ? t.user.nama_user.toLowerCase().includes(searchEmployee.toLowerCase()) : true;

            return isDateMatch && isEmployeeMatch;
        });

        setFilteredTransaksi(filteredData);
    };

    const filterByMonth = (date) => {
        setSelectedMonth(date);

        const filteredData = transaksi.filter((t) => {
            const tgl_transaksi = new Date(t.tgl_transaksi);
            const isMonthMatch = date ? tgl_transaksi.getMonth() === date.getMonth() && tgl_transaksi.getFullYear() === date.getFullYear() : true;

            return isMonthMatch;
        });

        setFilteredTransaksi(filteredData);
    };

    const filterByEmployee = (employeeName) => {
        setSearchEmployee(employeeName);

        const filteredData = transaksi.filter((t) => {
            const tgl_transaksi = new Date(t.tgl_transaksi);
            const isDateMatch = selectedDate ? tgl_transaksi.toDateString() === selectedDate.toDateString() : true;
            const isEmployeeMatch = employeeName ? t.user.nama_user.toLowerCase().includes(employeeName.toLowerCase()) : true;

            return isDateMatch && isEmployeeMatch;
        });

        setFilteredTransaksi(filteredData);
    };

    return (
        <div>
            <div className="mt-5 mx-5 flex">
                <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
                    <span className="flex-none">Tgl. Transaksi :</span>
                    <DatePicker
                        className="pl-1 bg-gray-100"
                        selected={selectedDate}
                        onChange={(date) => filterByDate(date)}
                    />
                </div>
            </div>

            {/* <div className="mt-5 mx-5 flex">
                <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
                    <span className="flex-none">Cari Karyawan :</span>
                    <input
                        className="pl-1 bg-gray-100"
                        type="text"
                        value={searchEmployee}
                        onChange={(e) => filterByEmployee(e.target.value)}
                        placeholder="Nama Karyawan"
                    />
                </div>
            </div>

            <div className="mt-5 mx-5 flex">
                <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
                    <span className="flex-none">Bulan Transaksi :</span>
                    <DatePicker
                        className="pl-1 bg-gray-100"
                        selected={selectedMonth}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        onChange={(date) => filterByMonth(date)}
                    />
                </div>
            </div> */}

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-green-600">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nama Kasir</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tanggal Transaksi</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Total Harga</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100 bg-green-200">
                        {filteredTransaksi.map((transaksi) => (
                            <tr key={transaksi.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                                <td className="px-6 py-4">{new Date(transaksi.tgl_transaksi).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{transaksi.total}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                            Lunas
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
