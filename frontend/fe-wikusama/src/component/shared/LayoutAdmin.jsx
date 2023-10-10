import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarAdmin";
import "./admin.css";

export default function Layout() {
    return (
        <div class="adminbg">
            <Sidebar />
            <div className="flex-1">
                <div> <Outlet /> </div>
            </div>
        </div>
    )
}