import React, { useState } from 'react'
import { Button, Icon, Form, Input, FormField } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./RegisterForm.scss";
import { validateEmail } from "../../../utils/Validations";


export default function RegistertForm(props) {
    const { setSelectedForm } = props;
    const [formData, setformData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
        setFormError({});
        let errors = {};
        let formOK = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOK = false;
        }

        if (formData.password.length < 6) {
            errors.password = true;
            formOK = false;
        }

        if (!formData.username) {
            errors.username = true;
            formOK = false;
        }

        setFormError(errors);

        if (formOK) {
            setIsLoading(true);
            console.log("Form Valido");
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("Registro Completado");
                })
                .catch(() => {
                    console.log("Error al crear la cuenta");
                })
                .finally(() => {
                    setIsLoading(false);
                    setSelectedForm(null);
                })
        }
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
                        icon="mail outline"
                        error={formError.email}
                    ></Input>
                    {formError.email && (
                        <span className="error-text">
                            Por favor, Introduce un correo valido
.                        </span>
                    )}
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
                        error={formError.password}
                    ></Input>
                    {formError.password && (
                        <span className="error-text">
                            Por favor, Introduce una contraseña superior a 6 caracteres.
.                        </span>
                    )}
                </FormField>
                <FormField>
                    <Input
                        type="text"
                        name="username"
                        placeholder="¿Como te llamamos?"
                        icon="user circle outline"
                        error={formError.username}
                    ></Input>
                    {formError.email && (
                        <span className="error-text">
                            Por favor, Introduce un nombre de usuario.
.                        </span>
                    )}
                </FormField>
                <Button type="submit" loading={isLoading}>Continuar</Button>
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