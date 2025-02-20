import Login from "@/views/Auth/Login.tsx";

//Shadcn
import {GalleryVerticalEnd} from "lucide-react";
import ModeToggle from "@/components/mode-toggle.tsx";
import {Link} from "react-router-dom";

/*import { GoogleOAuthProvider } from '@react-oauth/google'
import {GoogleLogin} from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"
import {useNavigate} from "react-router-dom"*/
export default function Home() {
    /*const clientID = "1051606546334-hauf4qc291dmffvfn2n8779mv9n83qdf.apps.googleusercontent.com";
    const navigate = useNavigate()
    const onLoginSuccess = (credentialResponse:any) => {
        const decoded = jwtDecode(credentialResponse.credential) as any;
        const username = decoded.name;
        /!*const email = decoded.email;
        const password = decoded.password;
        console.log(username, email);*!/
        // Redirect to the dashboard
        navigate("/dashboard", username);
    }*/
    return (
        <>
            <div className="grid grid-cols-[1fr_3fr_1fr] w-screen h-screen items-center">
                <div className="flex justify-start items-center h-full w-80">
                    <img src={"/src/assets/10513-gaussian-blur.jpg"} alt="Image" className="h-full dark:brightness-[0.3] dark:grayscale"/>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center h-screen">
                        <div className="grid grid-cols-2 items-center mt-4 mb-10">
                            <div className={"flex justify-center"}>
                                <GalleryVerticalEnd className={"mr-3"} />
                                <p>Acme Inc.</p>
                            </div>
                            <div className={"flex justify-end"}>
                                <ModeToggle/>
                            </div>
                        </div>
                        <div>
                            <Link to={"/register"}>Register</Link>
                        </div>
                        <div className="flex items-center justify-center w-96 h-full">
                            <Login/>
                        </div>
                </div>
                <div className="flex justify-end items-center h-full w-80">
                    <img src={"/src/assets/10513-gaussian-blur.jpg"} alt="Image" className="h-full dark:brightness-[0.3] dark:grayscale"/>
                </div>
            </div>
        </>
    );
}