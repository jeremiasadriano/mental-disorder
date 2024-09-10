import Cookies from 'js-cookie'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import { IUser } from '../../Types/IUser'


export default function FormLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messageError, setMessageError] = useState("")
    const [user, setUser] = useState<IUser | null>(null)
    const navigate = useNavigate()
    async function login() {
        try {
            const response = await useAxios.post("/login", user);
            const { user_id } = await response.data;
            Cookies.remove("id");
            Cookies.set("id", user_id);
            navigate("/classification");
        } catch (error: unknown) {
            if (error.response && error.response.status !== 500) {
                setMessageError("Email ou senha estão incorrectos");
            }
        }
    }

    function formFill(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setUser({ email: email, password: password })
        login()
    }

    return (
        <div className="max-w-md w-full p-8">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login</h1>
            <form onSubmit={(e) => formFill(e)} className="space-y-4">
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
                    <button type="submit" style={{ backgroundColor: 'rgb(47, 46, 65)' }} className="w-full bg-black p-2 rounded-md text-white">Entrar</button>
                </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
                <p>Não tem uma conta? <Link to={'/register'} className="text-black hover:underline">Faça o seu cadastro</Link>
                </p>
            </div>
        </div>
    )
}
