import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import exampleImage from "./logokasir.png";

export default function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoginAttempted, setIsLoginAttempted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        let errorTimer;
        if (errorMessage) {
            errorTimer = setTimeout(() => {
                setErrorMessage("");
            }, 2000); //ini detik proses pesan salah username dan password
        }

        let successTimer;
        if (showSuccessMessage) {
            successTimer = setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload()
            }, 1000); // ini detik proses pesan login berhasil 
        }

        return () => {
            clearTimeout(errorTimer);
            clearTimeout(successTimer);
        };
    }, [errorMessage, showSuccessMessage, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoginAttempted(true);
        let data = {
            username: user.username,
            password: user.password
        }

        try {
            const result = await axios.post('http://localhost:8000/user/login', data);
            const userData = result.data.data[0];

            if (userData) {
                const role = userData.role;

                sessionStorage.setItem('nama_user', userData.nama_user);
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('logged', result.data.logged);
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('id_user', userData.id);

                setShowSuccessMessage(true); // Menampilkan pesan sukses

                setErrorMessage(""); // Membersihkan pesan kesalahan

            } else {
                setErrorMessage("Username or password is incorrect.");
            }
        } catch (error) {
            setErrorMessage("Username or password is incorrect.");
        }
    }

    return (
        <section className="background">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="borderlogin">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div>
                            <div className="mt-3 text-left sm:mt-5">
                                <div className="inline-flex items-center w-full">
                                    <h3 className="text-lg font-bold text-neutral-600 leading-6 lg:text-5xl">Welcome!</h3>
                                </div>
                                <div className="mt-4 text-base text-gray-500">
                                    <p>Your Favorite Cafe</p>
                                </div>
                            </div>
                        </div>
                        {isLoginAttempted && errorMessage && <div className="text-red-500">{errorMessage}</div>}
                        {showSuccessMessage && <div className="text-green-500">Login successful. Redirecting...</div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-green">Username</label>
                                <input autoComplete="off" type="text" name="username" id="username" value={user.username} onChange={handleChange} className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-blue-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your username" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-green">Password</label>
                                <input type="password" name="password" id="password" value={user.password} onChange={handleChange} className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-blue-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password" required="" />
                            </div>
                            <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
