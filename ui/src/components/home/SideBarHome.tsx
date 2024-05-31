
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


export function SideBarHome() {
    const navigate = useNavigate()
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={BiBuoy}>
                        <Link to={'classification'}>
                            Classificação
                        </Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiViewBoards}>
                        Regressão
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiUser}>
                        <Link to={'profile'}>
                            Perfil
                        </Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiTable}>
                        <span onClick={() => {
                            Cookies.remove("id")
                            navigate("/login")
                        }}>
                            Sign Up
                        </span>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
