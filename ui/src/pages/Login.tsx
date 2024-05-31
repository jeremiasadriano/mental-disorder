import ImageLogin from "../components/Login-signUp/ImageLogin";
import FormLogin from "../components/Login-signUp/FormLogin";

export default function Login() {
    return (
        <div className="flex items-center justify-center p-8 mt-8 gap-6">
            <FormLogin />
            <ImageLogin />
        </div>
    )
}
