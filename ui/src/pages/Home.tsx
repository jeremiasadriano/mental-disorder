import { Outlet, useNavigate } from "react-router-dom";
import { SideBarHome } from "../components/home/SideBarHome";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export default function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        const id = Cookies.get("id")
        if (id == null || id == "" || id == undefined) {
            navigate("/login")
        }
    }, [])
    return (
        <div className="flex">
            <div>
                <SideBarHome />
            </div>
            <Outlet />
        </div>
    )
}
