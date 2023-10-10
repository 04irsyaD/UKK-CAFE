import React from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "./SidebarManager";
import "./bgmanager.png";
import "./bgmanager.css";

export default function Layout() {
    return (
        <div class="manager">
            <Sidebar />
            <div className="flex-1">
                <div> <Outlet /> </div>
            </div>
        </div>
    )
}