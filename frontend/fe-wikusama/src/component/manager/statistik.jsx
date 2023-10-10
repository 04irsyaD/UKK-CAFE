import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = () => {
    const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    };



    const [data, setData] = useState([]);
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/detail_transaksi', { headers })
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://localhost:8000/menu', { headers })
            .then(response => {
                setMenuData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
            });
    }, []);

    const calculateTotalPembelian = (menuId) => {
        const totalQty = data.reduce((total, item) => {
            if (item.id_menu === menuId) {
                return total + item.qty;
            }
            return total;
        }, 0);
        return totalQty;
    };

    const chartData = menuData.map(menuItem => {
        console.log(menuItem);
        return {
            nama_menu: menuItem.nama_menu,
            total_pembelian: calculateTotalPembelian(menuItem.id),
        };
    });

    return (
        <div className='pt-16'>
            <BarChart width={1900} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama_menu" interval={0} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_pembelian" fill="#8884d8" name="Total Pembelian" />
            </BarChart>
        </div>
    );
}

export default BarChartComponent;