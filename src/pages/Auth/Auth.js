import React, { useState } from 'react'
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import BackgroundApp from "../../assets/jpg/background-auth.jpg";
import LogoNameWite from "../../assets/png/logo-name-white.png";
import "./Auth.scss";


export default function Auth() {
    const [selectedForm, setSelectedForm] = useState(null);

    const handlerForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm />;
            case "register":
                return <RegisterForm setSelectedForm={setSelectedForm} />;
            default:
                return <AuthOptions setSelectedForm={setSelectedForm} />
        }
    }

    return (
        <div className="auth" style={{
            backgroundImage: `url(${BackgroundApp})`
        }}>
            <div className="auth__dark" />
            <div className="auth__box" >
                <div className="auth__box-logo">
                    <img src={LogoNameWite} alt="spotivergas"></img>
                </div>
                {handlerForm()}
            </div>
        </div>
    )
}
