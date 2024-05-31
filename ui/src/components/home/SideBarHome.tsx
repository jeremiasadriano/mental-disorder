
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiInbox, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export function SideBarHome() {
    return (
        <div className="h-screen bg-black-600">
            <Sidebar >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={BiBuoy}>
                            Classificação
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiViewBoards}>
                            Regressão
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiInbox}>
                            Visual
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                            Perfil
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
