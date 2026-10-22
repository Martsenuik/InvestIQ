import google from "../../images/icons/google.svg"
import { useState } from "react"
import "./AuthModal.css"

export const AuthModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="auth-modal">
                <p className="auth-text-google">Ви можете авторизуватися за допомогою акаунта Google</p>
                <button className="auth-btn-google">
                    <img className="auth-icon-google" src={google} alt="google" />
                    Google
                </button>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label-email">
                        Електронна пошта:
                        <input
                            className="auth-input-email"
                            type="email"
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    
                    <label className="auth-label-password">
                        Пароль:
                        <input
                            type="password"
                            className="auth-input-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="auth-btn-log-in" type="submit">УВІЙТИ</button>
                    <button className="auth-btn-registration" type="submit">РЕЄСТРАЦІЯ</button>
                </form>
            </div>
        </>
    )
}