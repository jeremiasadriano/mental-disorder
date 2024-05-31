import ImageLogin from "../components/Login-signUp/ImageLogin";
import FormSignUp from "../components/Login-signUp/FormSignUp";

export default function SignUp() {
    return (
        <div className="flex items-center justify-center p-8 mt-8 gap-6">
            <ImageLogin />
            <FormSignUp />
        </div>
    )
}
