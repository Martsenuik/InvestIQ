import google from "../../images/icons/google.svg"
import { useState } from "react"
import "./AuthModal.css"

export const AuthModal = () => {
    return (
        <>
            <div className="auth-modal">
                <p className="auth-text-google">Ви можете авторизуватися за допомогою акаунта Google</p>
                <button className="auth-btn-google">
                    <img className="auth-icon-google" src={google} alt="google" />
                    Google
                </button>
                <form className="auth-form">
                    <label className="auth-label-email">
                        Електронна пошта:
                        <input className="autn-input-email"
                            type="email" placeholder="your@email.com" />
                    </label>
                    
                    <label className="auth-label-password">
                        Пароль:
                        <input type="password" className="auth-input-password"/>
                    </label>
                    <button className="auth-btn-log-in">УВІЙТИ</button>
                    <button className="auth-btn-registration">РЕЄСТРАЦІЯ</button>
                </form>
            </div>
        </>
    )
}