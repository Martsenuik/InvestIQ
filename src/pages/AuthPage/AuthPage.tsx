import { AuthModal } from "../../components/auth/AuthModal"
import "../AuthPage/Auth.css"

export const AuthPage = () => {
    return (
        <section className="auth">
            <div className="auth-logo-wrapper" >
            <h1 className="auth-title">InvestIQ</h1>
                <p className="auth-text">SMART FINANCE</p>
                </div>
            <AuthModal />
        </section>
    )
}