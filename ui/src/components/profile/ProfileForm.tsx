import { useEffect, useState } from "react";
import { IUser } from "../../Types/IUser";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import Cookies from 'js-cookie'

export function ProfileForm() {
    const [user, setUser] = useState<IUser | null>(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messageError, setMessageError] = useState("");
    const navigate = useNavigate()
    const userId = Cookies.get("id")

    async function register() {
        try {
            const response = await useAxios.put(`/users/${userId}`, user)
            const { id } = await response.data
            Cookies.remove("id")
            Cookies.set("id", id)
            setMessageError("Perfil atualizado com sucesso")
        } catch (error) {
            console.log(error)
            setMessageError("Os dados inseridos são inválidos!")
        }
    }

    function formFill(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setUser({ username: username, email: email, password: password })
        register()
    }

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await useAxios.get(`/users/${userId}`);
                setUsername(response.data.username)
                setEmail(response.data.email)
            } catch (error) {
            }
        };
        fetchUsuario();
    }, [userId]);

    async function deleteAcc() {
        const userId = Cookies.get("id");
        try {
            await useAxios.delete(`/users/${userId}`);
            Cookies.remove("id");
            navigate("/login");
        } catch (error) {
            console.log("Erro ao excluir a conta do usuário", error);
        }
    }


    return (
        <div>

            <div className="max-w-md w-full p-8">
                <form onSubmit={formFill} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
                        <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Palavra passe</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <h1 className="text-red-600">{messageError}</h1>
                    <div>
                        <button type="submit" style={{ backgroundColor: 'rgb(47, 46, 65)' }} className="w-full bg-black p-2 rounded-md text-white">Atualizar</button>
                    </div>
                </form>
            </div>
            <div className="max-w-md w-full p-8" >
                <button type="submit" style={{ backgroundColor: 'Red' }} className="w-full bg-black p-2 rounded-md text-white" onClick={deleteAcc}>Apagar a conta</button>
            </div>
        </div>
    );
}
