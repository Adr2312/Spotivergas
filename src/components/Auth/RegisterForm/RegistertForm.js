import React, { useState } from 'react'
import { Button, Icon, Form, Input, FormField } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./RegisterForm.scss";


export default function RegistertForm(props) {
    const { setSelectedForm } = props;
    const [formData, setformData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onChange = e => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        console.log("Formulario enviado");
        console.log(formData);
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta vergas de Spotivergas, gratis.</h1>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <FormField>
                    <Input
                        type="text"
                        name="email"
                        placeholder="correo electronico"
                        icon="mail outliner"
                    //error={}
                    ></Input>
                </FormField>
                <FormField>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        icon={
                            showPassword ? (
                                <Icon name="eye slash outline" link onClick={handlerShowPassword} />
                            ) : (
                                    <Icon name="eye" link onClick={handlerShowPassword} />
                                )
                        }
                    //error={}
                    ></Input>
                </FormField>
                <FormField>
                    <Input
                        type="text"
                        name="username"
                        placeholder="¿Como te llamamos?"
                        icon="user circle outline"
                    //error={}
                    ></Input>
                </FormField>
                <Button type="submit">Continuar</Button>
            </Form>

            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>
                    ¿Ya tienes una VerguiCuenta? <span onClick={() => setSelectedForm("login")}>Iniciar Sesión</span>
                </p>
            </div>
        </div >
    )
}

function defaultValueForm() {
    return {
        email: "",
        password: "",
        username: ""
    };
}