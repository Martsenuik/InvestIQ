import google from "../../images/icons/google.svg"
import { useState, useEffect } from "react"
import "./AuthModal.css"
import { useAppDispatch } from "../../redux/hooks" 
import { logIn, register } from "../../redux/auth/authSlice"
import { useNavigate } from "react-router-dom"



export const AuthModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [allUsers, setAllUsers] = useState(() => {
      const savedUsers = localStorage.getItem("allUsers");
      return savedUsers ? JSON.parse(savedUsers) : [];
    });

    useEffect(() => {
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
    }, [allUsers]);

    const validateEmail = (emailValue: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailValue);
    };

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const savedUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

        const foundUser = savedUsers.find(
        (user: any) => 
        user.email.trim() === email.trim() && 
        user.password.trim() === password.trim()
        );

        if (foundUser) {
            localStorage.setItem("userEmail", foundUser.email);
            localStorage.setItem("userEmail", email);
        navigate("/"); 
        } else {
            alert("Неправильна пошта або пароль! Спочатку зареєструйся.");
            return;
        } 
        
        let isValid = true;

        if (!email.trim()) {
            setEmailError("Це обов'язкове поле");
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Невірний формат пошти (потрібен символ @)");
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError("Це обов'язкове поле");
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) return;

        try {
            await dispatch(logIn({ email, password })).unwrap();
            navigate('/'); 
        } catch (error) {
            console.error("Помилка входу:", error);
        }
    };
    

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
        const newUser = { email: email.trim(), password: password.trim(), balance: 0 };
        existingUsers.push(newUser);
        localStorage.setItem("allUsers", JSON.stringify(existingUsers));

        let isValid = true;

        if (!email.trim()) {
            setEmailError("Це обов'язкове поле");
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Невірний формат пошти (потрібен символ @ і .com)");
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError("Це обов'язкове поле");
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) return;

        try {
            await dispatch(register({ email, password })).unwrap();
            localStorage.setItem("userEmail", email);
            navigate('/'); 
        } catch (error) {
            console.error("Помилка реєстрації:", error);
        }
    };


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
                            autoComplete="email"
                        />
                        {emailError && <span style={{ color: 'red', fontSize: '12px' }}>{emailError}</span>}
                    </label>
                    
                    
                    <label className="auth-label-password">
                        Пароль:
                        <input
                            type="password"
                            className="auth-input-password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                         {passwordError && <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span>}
                    </label>
                   
                    <button className="auth-btn-log-in" type="submit" onClick={handleLogin}>УВІЙТИ</button>
                    <button className="auth-btn-registration" type="submit" onClick={handleRegister}>РЕЄСТРАЦІЯ</button>
                </form>
            </div>
        </>
    )
}